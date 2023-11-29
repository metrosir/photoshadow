
const settingsKey = sTID("settings");
const blurPresetsID = "blurPresets"
const shadowPresetsID = "shadowPresets"
const lastSettingsID = "lastSettings"

function clearPresets() {
  eraseCustomOptions(blurPresetsID);
  eraseCustomOptions(shadowPresetsID);
  eraseCustomOptions(shadowPresetListID);
  eraseCustomOptions(blurPresetListID);
}

function eraseBlurPreset(id) {
  eraseOptionKey(blurPresetsID, sTID(id))
}

function eraseShadowPreset(id) {
  eraseOptionKey(shadowPresetsID, sTID(id))
}

function eraseOptionKey(optionId, keyId) {
  var desc = app.getCustomOptions(optionId);
  if (desc !== null) {
    desc.erase(keyId);
    app.putCustomOptions(optionId, desc, true);
  }
}

function saveLastSettings(settings) {
  saveString(lastSettingsID, settingsKey, JSON.stringify(settings))
}

function getLastSettings() {
  return getSavedString(lastSettingsID, settingsKey)

}

function getBlurPresetSetting(id) {
  return getSavedString(blurPresetsID, sTID(id))
}

function getShadowPresetSetting(id) {
  return getSavedString(shadowPresetsID, sTID(id))
}

function saveBlurPreset(blurSettings) {
  var presetName = blurSettings.presetName || 'unnamed preset'
  saveString(blurPresetsID, sTID(presetName), JSON.stringify(blurSettings))
}

function saveShadowPreset(shadowSettings) {
  var presetName = blurSettings.presetName || 'unnamed preset'
  saveString(shadowPresetsID, sTID(presetName), JSON.stringify(shadowSettings))
}

function getBlurPresets() {
  return getPresets(blurPresetsID)
}

function getShadowPresets() {
  return getPresets(shadowPresetsID)
}

function getPresets(customOptionID) {
  var desc
  try {
    desc = app.getCustomOptions(customOptionID)
  } catch (e) { }
  if (!desc) {
    return
  }

  var presetNames = []
  for (var i = 0; i < desc.count; i++) {
    var preset = JSON.parse(desc.getString(desc.getKey(i)))
    presetNames.push(preset.presetName)
  }
  return presetNames
}

function saveString(id, stringKey, string) {
  var desc = new ActionDescriptor();
  try {
    var existing = app.getCustomOptions(id)
    desc = existing
  } catch (e) { }

  desc.putString(stringKey, string);
  app.putCustomOptions(id, desc, true);
}

function resetCustomOptions(id) {
  var desc = new ActionDescriptor();
  app.putCustomOptions(id, desc, true);
}

function getSavedString(id, stringKey) {
  var string
  try {
    var desc = app.getCustomOptions(id);
    string = desc.getString(stringKey);
  } catch (e) { }
  return string
}

function applyBlur(settings) {
  usePixelUnits()
  var doc = app.activeDocument
  var s = settings

  doc.suspendHistory("Blur", "_blur()")
  resetUnits()

  function _blur() {

    if (s.startFrom == 'Upper Layer') {
      selectUpperLayer()
      selectionFromVisible()
      selectLowerLayer()
    }

    var selection = doc.selection
    if (!selection.active()) {
      alert('No selection found')
      return
    }

    var factor = s.stepScale
    var angle = s.angle, steps = s.steps
    var motionAngle = biDirectionalAngle(angle)
    var gBlur = s.gaussianBlur, mBlur = s.motionBlur
    var percentBase = getPercentBase(doc.activeLayer, angle)
    var distance = toPx({ value: 100, unit: '%' }, percentBase)
    var distanceSteps = distributeByFactor(distance, steps, factor, false)
    var gaussianBlurSteps = distributeByFactor(gBlur, steps, factor, true)
    var motionBlurSteps = distributeByFactor(mBlur, steps, factor, true)

    for (var i = 0; i < steps; i++) {
      var gBlur_i = gaussianBlurSteps[i]
      var mBlur_i = motionBlurSteps[i]
      try {
        selection.expand(distanceSteps[i])
      } catch (e) { }

      selection.invert()
      try {
        selection.feather(Math.max(gBlur_i, mBlur_i))
      } catch (e) { }

      applyGaussianBlur(gBlur_i)
      applyMotionBlur(motionAngle, mBlur_i)
      selection.invert()
    }
    selection.deselect()
  }
}

function applyMotionBlur(angle, distance) {
  var desc = new ActionDescriptor();
  desc.putInteger(idAngl, angle);
  desc.putUnitDouble(idDstn, idPxl, distance);
  executeAction(idMtnB, desc, DialogModes.NO);
}

function applyGaussianBlur(radius) {
  var desc = new ActionDescriptor();
  desc.putUnitDouble(idRds, idPxl, radius);
  executeAction(idGsnB, desc, DialogModes.NO);
}

function getPercentBase(layer, angle) {
  var layBounds = layer.bounds
  var percentBase
  if ((Math.abs(angle) >= 45 && Math.abs(angle) <= 135)) {
    percentBase = (layBounds[3] - layBounds[1])
  } else {
    percentBase = (layBounds[2] - layBounds[0])
  }
  return percentBase
}

function biDirectionalAngle(angle) {
  if (angle > 90 && angle <= 180) {
    angle -= 180
  } else if (angle < -90 && angle >= -180) {
    angle += 180
  }
  return angle
}


function applyShadow(settings) {
  usePixelUnits()
  var s = settings
  var doc = app.activeDocument
  doc.suspendHistory("Shadowify", "_shadow()")
  resetUnits()

  function _shadow() {
    var blur = s.blur, steps = s.steps, angle = invertAngle(s.angle)
    var factor = s.stepScale, useGlobalLight = s.useGlobalLight, flatten = s.flatten
    var percentBase = getPercentBase(doc.activeLayer, angle)
    var distance = toPx(s.distance, percentBase)

    var distanceSteps = distributeByFactor(distance, steps, factor, true)
    var blurSteps = distributeByFactor(blur, steps, factor, true)
    var originalName = doc.activeLayer.name

    if (useGlobalLight) {
      setGlobalLight(angle, 0)
    }

    var copies = Math.ceil(steps / 10)
    var copyRefs = []
    for (var c = 0; c < copies; c++) { // create copies
      duplicateActive()
      renameActiveLayer(originalName + ' copy ' + (c+1))
      copyRefs.push(doc.activeLayer)
    }

    var shadowIndex = 0
    for (var c = 0; c < copies; c++) { // apply shadows
      app.activeDocument.activeLayer = copyRefs[c]
      var targetDesc = targetLayerDescriptor()
      setFillOpacity(targetDesc, 0)
      var shadowIndex = addShadowFx(shadowIndex, steps, distanceSteps, blurSteps, angle, useGlobalLight)
      if (flatten) {
        rasterizeLayerStyle(targetDesc)
      }
    }

    // cleanup & merge
    if (flatten) {
      for (var c = 1; c < copies; c++) {
        mergeDown()
      }
    } else {
      for (var c = 1; c < copies; c++) {
        selectByDesc(lowerLayerDescriptor(), true)
      }
      if(copies > 1) {
        newGroupFromLayers()
      }
    }
    renameActiveLayer(originalName + ' shadow')
    sendBackwards(targetLayerDescriptor())
  }
}


function addShadowFx(startIndex, totalShadows, distanceSteps, blurSteps, angle, useGlobalLight) {

  var desc = targetLayerFxDescriptor()
  var desc2 = new ActionDescriptor();
  var colorDesc = colorDescriptor(0, 0, 0)
  desc2.putUnitDouble(idScl, idPrc, 100);
  var iddropShadowMulti = sTID("dropShadowMulti");
  var shadowList = new ActionList();

  var opacity = 100
  var blurry = blurSteps[totalShadows - 1] > 3
  var endIndex = Math.min(startIndex + 10, totalShadows)
  var opacityStep = 80 / distanceSteps.length

  for (var i = startIndex; i < endIndex; i++) {
    if (blurry && i > 0) {
      opacity = i + 1 < distanceSteps.length ? 100 - opacityStep * i : 80
    }

    var shadow_desc = shadowDescriptor(colorDesc, opacity, angle, distanceSteps[i], blurSteps[i], 0, false, true, useGlobalLight)
    shadowList.putObject(idDrSh, shadow_desc);
  }

  desc2.putList(iddropShadowMulti, shadowList);

  if (startIndex < 10) {
    var idIrSh = charIDToTypeID("IrSh");
    desc2.putObject(idIrSh, idIrSh, innerShadowDescriptor(colorDesc, 100, invertAngle(angle), 4, 1, 0, false));
  }

  desc.putObject(idT, idLefx, desc2);
  executeAction(idsetd, desc, DialogModes.NO);
  return endIndex
}


function distributeByFactor(range_size, slices, factor, addup) {
  var parts = []
  if (factor == 1) {
    for (var i = 1; i <= slices; i++) {
      var part = range_size / slices
      part = addup ? i * part : part
      parts.push(part)
    }
  } else {
    var startValue = (range_size * Math.abs(factor - 1)) / (Math.pow(factor, slices) - 1)
    var increasingFactor = factor
    parts.push(Math.ceil(startValue))
    var prevPart = startValue
    for (var i = 1; i < slices; i++) {
      var nextPart = startValue * increasingFactor
      if (addup) {
        nextPart += prevPart
        prevPart = nextPart
      }
      parts.push(Math.ceil(nextPart))
      increasingFactor *= factor
    }
  }
  return parts
}

function setGlobalLight(angle, altitude) {

  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  var idgblA = cTID("gblA");
  ref.putProperty(idPrpr, idgblA);
  ref.putEnumerated(idDcmn, idOrdn, idTrgt);
  desc.putReference(idnull, ref);
  var desc2 = new ActionDescriptor();
  var idgagl = cTID("gagl");
  desc2.putUnitDouble(idgagl, idAng, angle);
  var idglobalAltitude = sTID("globalAltitude");
  desc2.putUnitDouble(idglobalAltitude, idAng, altitude);
  desc.putObject(idT, idgblA, desc2);
  executeAction(idsetd, desc, DialogModes.NO);
}

function invertAngle(angle) {
  return angle >= 0 ? angle - 180 : angle + 180
}

function shadowDescriptor(colorDesc, opacity, angle, distance, blur, noise, antialias, hideBehindLayer, useGlobalLight) {
  var shadow_desc = new ActionDescriptor();
  shadow_desc.putBoolean(idenab, true);
  shadow_desc.putBoolean(idpresent, true);
  shadow_desc.putEnumerated(idMd, idBlnM, idNrml);
  shadow_desc.putObject(idClr, idRGBC, colorDesc);
  shadow_desc.putUnitDouble(idOpct, idPrc, opacity);
  shadow_desc.putBoolean(iduglg, useGlobalLight);
  shadow_desc.putUnitDouble(idlagl, idAng, angle);
  shadow_desc.putUnitDouble(idDstn, idPxl, distance);
  shadow_desc.putUnitDouble(idblur, idPxl, blur);
  shadow_desc.putUnitDouble(idNose, idPrc, noise);
  shadow_desc.putBoolean(idAntA, antialias);
  shadow_desc.putBoolean(idlayerConceals, hideBehindLayer);
  return shadow_desc
}

function innerShadowDescriptor(colorDesc, opacity, angle, distance, blur, noise, antiAlias) {
  var shadow_desc = new ActionDescriptor();
  shadow_desc.putBoolean(idenab, true);
  shadow_desc.putBoolean(idpresent, true);
  shadow_desc.putEnumerated(idMd, idBlnM, idNrml);
  shadow_desc.putObject(idClr, idRGBC, colorDesc);
  shadow_desc.putUnitDouble(idOpct, idPrc, opacity);
  shadow_desc.putBoolean(iduglg, false);
  shadow_desc.putUnitDouble(idlagl, idAng, angle);
  shadow_desc.putUnitDouble(idDstn, idPxl, distance);
  shadow_desc.putUnitDouble(idblur, idPxl, blur);
  shadow_desc.putUnitDouble(idNose, idPrc, noise);
  shadow_desc.putBoolean(idAntA, antiAlias);
  return shadow_desc
}

function colorDescriptor(r, g, b) {
  var color_desc = new ActionDescriptor();
  color_desc.putDouble(idRd, r);
  color_desc.putDouble(idGrn, g);
  color_desc.putDouble(idBl, b);
  return color_desc
}



