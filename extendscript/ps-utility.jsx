// --------------------------------- Some Values
var rememberedUnits = []
var unitsChanged = false
var anchorPositions = [AnchorPosition.TOPLEFT,
AnchorPosition.TOPCENTER, AnchorPosition.TOPRIGHT,
AnchorPosition.MIDDLELEFT, AnchorPosition.MIDDLECENTER,
AnchorPosition.MIDDLERIGHT, AnchorPosition.BOTTOMLEFT,
AnchorPosition.BOTTOMCENTER, AnchorPosition.BOTTOMRIGHT
]
// --------------------------------- Prototype Extensions

Selection = function () { }
Selection.prototype.active = function () {
  try { return (this.bounds) ? true : false; }
  catch (e) { return false; }
}

$.writeln("This is a test");
alert('This is a test....')
console.info('this is a console info')
// --------------------------------- Action Manager Code Basics

function cTID(charID) {
  return charIDToTypeID(charID);
}
function sTID(stringID) {
  return stringIDToTypeID(stringID);
}
function tSID(typeID) {
  return typeIDToStringID(typeID);
}

var idnull = cTID("null")
var idLyr = cTID("Lyr ") // Layer
var idOrdn = cTID("Ordn") // Ordinal
var idTrgt = cTID("Trgt") // TargetEnum
var idsetd = cTID("setd") // set
var idPrpr = cTID("Prpr") // property
var idLefx = cTID("Lefx") // LayerEffects
var idNm = cTID("Nm  ") // Name
var idClr = cTID("Clr ") // Color
var idRGBC = cTID("RGBC") // RGBColor
var idRd = cTID("Rd  ") // red
var idGrn = cTID("Grn ") // green
var idBl = cTID("Bl  ") // blue
var idScl = cTID("Scl ") // scale
var idPrc = cTID("#Prc") // percent
var idT = cTID("T   ") // to
var idSoFi = cTID("SoFi") // SolidFill
var idMd = cTID("Md  ") // Mode
var idBlnM = cTID("BlnM") // BlendMode
var idNrml = cTID("Nrml") // Normal
var idOpct = cTID("Opct") // Opacity
var idChnl = cTID("Chnl") // Channel
var idfsel = cTID("fsel") // Selection
var idPxl = cTID("#Pxl") // Pixel
var idTop = cTID("Top ") // Top
var idLeft = cTID("Left") // Left
var idBtom = cTID("Btom") // Bottom
var idRght = cTID("Rght") // Right
var idRctn = cTID("Rctn") // Rectangle
var idMk = cTID("Mk  ") // make
var idmove = cTID("move") // move
var idPstn = cTID("Pstn") // Position
var idOrnt = cTID("Ornt") // Orientation
var idNw = cTID("Nw  ") // New
var idMsk = cTID("Msk ") // Mask
var idOfst = cTID("Ofst") // Offset
var idHrzn = cTID("Hrzn") // Horizontal
var idVrtc = cTID("Vrtc") // Vertical
var idNone = cTID("None") // None
var idenab = cTID("enab") // enabled
var iduglg = cTID("uglg") // Use global lighting angle
var idlagl = cTID("lagl") // Local lightning angle
var idAng = cTID("#Ang") // Angle Unit
var idDstn = cTID("Dstn") // Distance
var idblur = cTID("blur") // Blur
var idNose = cTID("Nose") // Noise
var idDrSh = cTID("DrSh") // DropShadow
var idAntA = cTID("AntA") // AntiAlias
var idCkmt = cTID("Ckmt") // Choke Matte
var idGsnB = cTID("GsnB") // GaussianBlur
var idRds = cTID("Rds ") // Radius
var idMtnB = cTID("MtnB") // MotionBlur
var idAngl = cTID("Angl") // Angle
var idslct = cTID("slct") // select
var idBckw = cTID("Bckw") // backwards enum
var idFrwr = cTID("Frwr") // forwards enum
var idMkVs = cTID("MkVs") // make visible
var idPath = cTID("Path") // Path
var idDcmn = cTID('Dcmn') // Document

var idpresent = sTID("present")
var idsolidColorLayer = sTID("solidColorLayer")
var idcontentLayer = sTID("contentLayer")
var idlayerConceals = sTID("layerConceals")
var idshowInDialog = sTID("showInDialog")

function layerDescById_with_idnull(id) {
  var desc = new ActionDescriptor()
  var ref = new ActionReference()
  ref.putIdentifier(idLyr, id)
  desc.putReference(idnull, ref)
  return desc
}

function layerDescByIdx_with_idnull(index) {
  var desc = new ActionDescriptor()
  var ref = new ActionReference()
  ref.putIndex(idLyr, index)
  desc.putReference(idnull, ref)
  return desc
}

function layerDescByIdx(index) {
  var ref = new ActionReference();
  ref.putIndex(idLyr, index)
  var desc = executeActionGet(ref)
  return desc
}

function layerDescById(id) {
  var ref = new ActionReference();
  ref.putIdentifier(idLyr, id)
  var desc = executeActionGet(ref)
  return desc
}

function targetLayerRef() {
  var ref = new ActionReference()
  ref.putEnumerated(idLyr, idOrdn, idTrgt)
  return ref
}

function targetLayerDescriptor() {
  var desc = new ActionDescriptor()
  desc.putReference(idnull, targetLayerRef())
  return desc
}

function targetLayerFxDescriptor() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putProperty(idPrpr, idLefx);
  ref.putEnumerated(idLyr, idOrdn, idTrgt);
  desc.putReference(idnull, ref);
  return desc
}

function contentLayerDescriptor() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putClass(idcontentLayer);
  desc.putReference(idnull, ref);
  return desc
}

function selectionDescriptor() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putProperty(idChnl, idfsel);
  desc.putReference(idnull, ref);
  return desc
}

function lowerLayerDescriptor() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putEnumerated(idLyr, idOrdn, idBckw);
  desc.putReference(idnull, ref);
  return desc;
}

function upperLayerDescriptor() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putEnumerated(idLyr, idOrdn, idFrwr);
  desc.putReference(idnull, ref);
  return desc;
}

// --------------------------------- Reference Conversions

function layersToIds(layers) {
  var ids = []
  for (var i = 0; i < layers.length; i++) {
    ids.push(layers[i].id)
  }
  return ids
}

function getActiveLayerIndex() {
  if (app.activeDocument.artLayers.length < 2) return 1;
  var idItmI = cTID("ItmI");
  var ref = targetLayerRef()
  var idx = executeActionGet(ref).getInteger(cTID("LyrI"));
  ref = new ActionReference();
  ref.putProperty(cTID("Prpr"), idItmI);
  ref.putIdentifier(idLyr, idx);
  idx = executeActionGet(ref).getInteger(idItmI);
  if (idx) return idx;
  return 0;
}

// ---------------------------------- Utility Functions



// ------- Layer Pallette

function selectLayers(indices) {
  for (var i = 0; i < indices.length; i++) {
    selectLayerByIndex(indices[i], i)
  }
}

function renameActiveLayer(name) {
  var idsetd = cTID("setd");
  var desc = new ActionDescriptor();
  var ref = targetLayerRef()
  desc.putReference(idnull, ref);
  var desc2 = new ActionDescriptor();
  desc2.putString(idNm, name);
  desc.putObject(idT, idLyr, desc2);
  executeAction(idsetd, desc, DialogModes.NO);
}

function createFrame(bounds) {
  var idMk = cTID("Mk  ");
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  var idframedGroupSection = sTID("framedGroupSection");
  ref.putClass(idframedGroupSection);
  desc.putReference(idnull, ref);
  var idframedGroupRect = sTID("framedGroupRect");
  var desc2 = new ActionDescriptor();
  var idTop = cTID("Top ");
  desc2.putDouble(idTop, bounds[0]);
  var idLeft = cTID("Left");
  desc2.putDouble(idLeft, bounds[1]);
  var idBtom = cTID("Btom");
  desc2.putDouble(idBtom, bounds[2]);
  var idRght = cTID("Rght");
  desc2.putDouble(idRght, bounds[3]);
  var idclassFloatRect = sTID("classFloatRect");
  desc.putObject(idframedGroupRect, idclassFloatRect, desc2);
  var idframedGroupType = sTID("framedGroupType");
  desc.putInteger(idframedGroupType, 1);
  executeAction(idMk, desc, DialogModes.NO);
}

function getActiveTextLayerRotation() {
  var ref = targetLayerRef()
  var desc = executeActionGet(ref).getObjectValue(sTID('textKey'))
  if (desc.hasKey(sTID('transform'))) {
    desc = desc.getObjectValue(sTID('transform'))
    var yy = desc.getDouble(sTID('yy'));
    var xy = desc.getDouble(sTID('xy'));
    return -angleFromMatrix(yy, xy);
  }
  return 0;
}

function selectLayerByIndex(index, add) {
  var desc = layerDescByIdx_with_idnull(index)
  selectByDesc(desc, add)
}

function selectByDesc(desc, add) {
  if (add) desc.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("addToSelection"));
  desc.putBoolean(cTID("MkVs"), false);
  try {
    executeAction(cTID("slct"), desc, DialogModes.NO);
  } catch (e) { }
}

function makeActiveByIndex(index, makeVisible) {
  var desc = layerDescByIdx_with_idnull(index)
  desc.putBoolean(cTID("MkVs"), makeVisible);
  executeAction(cTID("slct"), desc, DialogModes.NO);
}

/**
 * Note: Changes the current layer selection
 * @param {*} indices 
 */
function getLayersByIndices(indices) {
  var doc = app.activeDocument
  var layers = []
  for (var i = 0; i < indices.length; i++) {
    makeActiveByIndex(indices[i], false)
    layers.push(doc.activeLayer)
  }
  return layers
}

function getSelectedLayersIndices() {
  var selectedLayers = [];
  try {
    var bgCount = 1;
    try {
      var test = app.activeDocument.backgroundLayer;
      bgCount = 0;
    }
    catch (e) { }

    var ref = new ActionReference();
    var keyTargetLayers = sTID('targetLayers');
    ref.putProperty(cTID('Prpr'), keyTargetLayers);
    ref.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
    var desc = executeActionGet(ref);
    if (desc.hasKey(keyTargetLayers)) {
      var layersList = desc.getList(keyTargetLayers);
      for (var i = 0; i < layersList.count; i++) {
        var listRef = layersList.getReference(i);
        selectedLayers.push(listRef.getIndex() + bgCount);
      }
    }
  } catch (e) { }
  return selectedLayers;
}

function getSelectedLayers() {
  var allSelected = getLayersByIndices(getSelectedLayersIndices())
  for (var i = 0; i < allSelected.length; i++) {
    if (allSelected[i].typename == 'LayerSet') {
      var group = allSelected[i]
      for (var c = 0; c < group.layers.length; c++) {
        remove(allSelected, group.layers[c])
      }
    }
  }
  return allSelected
}

function moveLayerTo(layer, x, y, regX, regY) {
  if (isTransformable(layer)) {
    usePixelUnits()
    var _regX = regX ? regX : 0
    var _regY = regY ? regY : 0
    var xShift = !isNaN(x) ? Math.round(-(x - layer.bounds[0]) - _regX) : 0
    var yShift = !isNaN(y) ? Math.round(-(y - layer.bounds[1]) - _regY) : 0
    layer.translate(xShift, yShift)
    resetUnits()
  }
}

function isTransformable(layer) {
  var type = layer.kind
  var typeAllowed = type == LayerKind.NORMAL ||
    type == LayerKind.LAYER3D ||
    type == LayerKind.SMARTOBJECT ||
    type == LayerKind.VIDEO ||
    type == LayerKind.TEXT ||
    (type == LayerKind.SOLIDFILL && !solidFillIsFullsize(layer))
  return layer.typename == 'LayerSet' || typeAllowed
}

function solidFillIsFullsize(layer) {
  var docSize = _docSize()
  var bounds = pixelBounds(layer.bounds)
  var width = bounds[2] - bounds[0]
  var height = bounds[3] - bounds[1]
  return width == docSize.width && height == docSize.height
}

/**
 * 
 * @param {*} bounds [x1, y1, x2, y2]
 * @param {*} color 
 */
function createRectangleLayer(bounds, color) {
  var desc = contentLayerDescriptor()
  var idUsng = cTID("Usng");
  var desc2 = new ActionDescriptor();
  var idType = cTID("Type");
  var desc3 = new ActionDescriptor();

  var desc4 = new ActionDescriptor();
  desc4.putDouble(idRd, color.rgb.red);
  desc4.putDouble(idGrn, color.rgb.green);
  desc4.putDouble(idBl, color.rgb.blue);
  desc3.putObject(idClr, idRGBC, desc4);

  desc2.putObject(idType, idsolidColorLayer, desc3);

  var idShp = cTID("Shp ");
  var desc5 = new ActionDescriptor();
  var idunitValueQuadVersion = sTID("unitValueQuadVersion");
  desc5.putInteger(idunitValueQuadVersion, 1);
  desc5.putUnitDouble(idLeft, idPxl, bounds[0]);
  desc5.putUnitDouble(idTop, idPxl, bounds[1]);
  desc5.putUnitDouble(idRght, idPxl, bounds[2]);
  desc5.putUnitDouble(idBtom, idPxl, bounds[3]);
  desc2.putObject(idShp, idRctn, desc5);

  desc.putObject(idUsng, idcontentLayer, desc2);
  executeAction(idMk, desc, DialogModes.NO);
}

function setGroupedById(id) {
  var idGrpL = charIDToTypeID("GrpL");
  var desc = layerDescById_with_idnull(id)
  executeAction(idGrpL, desc, DialogModes.NO);
}

function deleteGroup(group, deleteContained) {
  var idDlt = charIDToTypeID("Dlt ");
  var desc = layerDescById_with_idnull(group.id)
  var iddeleteContained = stringIDToTypeID("deleteContained");
  desc.putBoolean(iddeleteContained, deleteContained);
  executeAction(idDlt, desc, DialogModes.NO);
}

function selectLowerLayer() {
  var desc = lowerLayerDescriptor()
  desc.putBoolean(idMkVs, false);
  executeAction(idslct, desc, DialogModes.NO)
}

function selectUpperLayer() {
  var desc = upperLayerDescriptor()
  desc.putBoolean(idMkVs, false);
  executeAction(idslct, desc, DialogModes.NO)
}

function moveActiveLayerToIndex(idx) {
  var desc = new ActionDescriptor();
  var ref = targetLayerRef()
  desc.putReference(idnull, ref);
  ref = new ActionReference();
  ref.putIndex(idLyr, idx);
  desc.putReference(cTID("T   "), ref);
  desc.putBoolean(cTID("Adjs"), false);
  return executeAction(cTID("move"), desc, DialogModes.NO);
}

function selectAllLayers() {
  var idselectAllLayers = sTID("selectAllLayers");
  var desc = new ActionDescriptor();
  var ref = targetLayerRef()
  desc.putReference(idnull, ref);
  executeAction(idselectAllLayers, desc, DialogModes.NO);
}

function newGroupFromLayers() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putClass(sTID('layerSection'));
  desc.putReference(idnull, ref);
  var lref = targetLayerRef()
  desc.putReference(cTID('From'), lref);
  executeAction(cTID('Mk  '), desc, DialogModes.NO);
  return app.activeDocument.activeLayer
}

function getAllLayers(includeBackground, includeGroups) {
  var layers = []
  getLayersRecursively(app.activeDocument, layers, includeBackground, includeGroups)
  return layers
}

function getLayersRecursively(parent, allLayers, includeBackground, includeGroups) {
  for (var i = 0; i < parent.layers.length; i++) {
    var currLayer = parent.layers[i];
    var isBG = currLayer.isBackgroundLayer
    var isArtlayer = currLayer.typename === "ArtLayer"
    var add = !isBG || (isBG && includeBackground)
    if (isArtlayer) {
      if (add) {
        allLayers.push(currLayer);
      }
    } else {
      if (includeGroups) {
        allLayers.push(currLayer);
      }
      getLayersRecursively(currLayer, allLayers, includeBackground, includeGroups);
    }
  }
  return allLayers;
}


/**
 * type: 'normal', 'smartobject', 'text', 'group', 'adjustment', 'shape'
 */
function selectLayersFromType(type) {
  var layers = getAllLayers(false, true)
  switch (type) {
    case 'normal':
      layers = layers.filter(isNormalLayer)
      break;
    case 'smartobject':
      layers = layers.filter(isSmartObjectLayer)
      break;
    case 'text':
      layers = layers.filter(isTextLayer)
      break;
    case 'group':
      layers = layers.filter(isLayerSet)
      break;
    case 'adjustment':
      layers = layers.filter(isAdjustmentLayer)
      break;
    case 'shape':
      layers = layers.filter(isShapeLayer)
      break;
  }

  if (layers.length == 0) {
    alert('There are no ' + type + ' layers in the document.')
    return
  }

  for (var i = 0; i < layers.length; i++) {
    var lay = layers[i]
    var desc = layerDescById_with_idnull(lay.id)
    if (i == 0) {
      selectByDesc(desc, false)
    } else {
      selectByDesc(desc, true)
    }
  }
}

function isArtLayer(layer) {
  return layer.typename == 'ArtLayer'
}

function isNormalLayer(layer) {
  return isArtLayer(layer)
    && (layer.kind == LayerKind.NORMAL
      || layer.kind == LayerKind.LAYER3D)
}

function isShapeLayer(layer) {
  return isArtLayer(layer)
    && layer.kind == LayerKind.SOLIDFILL
}

function isSmartObjectLayer(layer) {
  return isArtLayer(layer)
    && layer.kind == LayerKind.SMARTOBJECT
}

function isTextLayer(layer) {
  return isArtLayer(layer)
    && layer.kind == LayerKind.TEXT
}

function isAdjustmentLayer(layer) {
  return isArtLayer(layer)
    && (layer.kind == LayerKind.BLACKANDWHITE
      || layer.kind == LayerKind.BRIGHTNESSCONTRAST
      || layer.kind == LayerKind.CHANNELMIXER
      || layer.kind == LayerKind.COLORBALANCE
      || layer.kind == LayerKind.CURVES
      || layer.kind == LayerKind.EXPOSURE
      || layer.kind == LayerKind.GRADIENTFILL
      || layer.kind == LayerKind.GRADIENTMAP
      || layer.kind == LayerKind.HUESATURATION
      || layer.kind == LayerKind.INVERSION
      || layer.kind == LayerKind.LEVELS
      || layer.kind == LayerKind.PATTERNFILL
      || layer.kind == LayerKind.PHOTOFILTER
      || layer.kind == LayerKind.POSTERIZE
      || layer.kind == LayerKind.SELECTIVECOLOR
      || layer.kind == LayerKind.THRESHOLD
      || layer.kind == LayerKind.VIBRANCE)
}

function pastePixels() {
  var idpast = cTID("past");
  var desc = new ActionDescriptor();
  var idAntA = cTID("AntA");
  var idAnnt = cTID("Annt");
  var idAnno = cTID("Anno");
  desc.putEnumerated(idAntA, idAnnt, idAnno);
  var idAs = cTID("As  ");
  var idPxel = cTID("Pxel");
  desc.putClass(idAs, idPxel);
  executeAction(idpast, desc, DialogModes.NO);
}

function mergeDown() {
  var idMrgtwo = cTID("Mrg2");
  var desc = new ActionDescriptor();
  executeAction(idMrgtwo, desc, DialogModes.NO);
}

function duplicateActive() {
  var idCpTL = cTID("CpTL");
  executeAction(idCpTL, undefined, DialogModes.NO);
}

function duplicateWithName(name) {
  duplicateActive()
  var cpy = app.activeDocument.activeLayer
  cpy.name = name
  return cpy
}

function scale(layerDesc, widthPercent, heightPercent, xOffset, yOffset) {
  var idTrnf = cTID("Trnf");
  var idFTcs = cTID("FTcs");
  var idQCSt = cTID("QCSt");
  var idQcsa = cTID("Qcsa");
  layerDesc.putEnumerated(idFTcs, idQCSt, idQcsa);
  var desc2 = new ActionDescriptor();
  desc2.putUnitDouble(idHrzn, idPxl, xOffset);
  desc2.putUnitDouble(idVrtc, idPxl, yOffset);
  layerDesc.putObject(idOfst, idOfst, desc2);

  var idIntr = cTID("Intr");
  var idIntp = cTID("Intp");
  var idBcbc = cTID("Bcbc");

  if (heightPercent) {
    var idHght = cTID("Hght");
    layerDesc.putUnitDouble(idHght, idPrc, heightPercent);
    layerDesc.putEnumerated(idIntr, idIntp, idBcbc);
  }

  if (widthPercent) {
    var idWdth = cTID("Wdth");
    layerDesc.putUnitDouble(idWdth, idPrc, widthPercent);
    layerDesc.putEnumerated(idIntr, idIntp, idBcbc);
  }

  executeAction(idTrnf, layerDesc, DialogModes.NO);
}

function move(layerDesc, x, y) {
  var idmove = cTID("move");
  var idT = cTID("T   ");
  var desc = new ActionDescriptor();
  desc.putUnitDouble(idHrzn, idPxl, x);
  desc.putUnitDouble(idVrtc, idPxl, y);
  var idOfst = cTID("Ofst");
  layerDesc.putObject(idT, idOfst, desc);
  executeAction(idmove, layerDesc, DialogModes.NO);
}

function setFillOpacity(desc, percent) {
  var fill_desc = new ActionDescriptor();
  var idfillOpacity = sTID("fillOpacity");
  fill_desc.putUnitDouble(idfillOpacity, idPrc, percent);
  desc.putObject(idT, idLyr, fill_desc);
  executeAction(idsetd, desc, DialogModes.NO);
}

function rasterizeLayerStyle(desc) {
  var idrasterizeLayer = sTID("rasterizeLayer");
  var idWhat = cTID("What");
  var idrasterizeItem = sTID("rasterizeItem");
  var idlayerStyle = sTID("layerStyle");
  desc.putEnumerated(idWhat, idrasterizeItem, idlayerStyle);
  executeAction(idrasterizeLayer, desc, DialogModes.NO);
}

function rasterizeLayer(desc) {
  var idrasterizeLayer = sTID("rasterizeLayer");
  executeAction(idrasterizeLayer, desc, DialogModes.NO);
}

function sendBackwards(desc) {
  var previous_ref = new ActionReference();
  var idPrvs = charIDToTypeID("Prvs");
  previous_ref.putEnumerated(idLyr, idOrdn, idPrvs);
  desc.putReference(idT, previous_ref);
  executeAction(idmove, desc, DialogModes.NO);
}

// ------- Selection

function copySelectedPixels() {
  var idcopy = cTID("copy");
  executeAction(idcopy, undefined, DialogModes.NO);
}

/**
 * 
 * @param {*} bounds // x1, y1, x2, y2
 */
function select(bounds) {
  var idSbtF = cTID("SbtF");
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putProperty(idChnl, idfsel);
  desc.putReference(idnull, ref);

  var desc2 = new ActionDescriptor();
  desc2.putUnitDouble(idTop, idPxl, bounds[1]);
  desc2.putUnitDouble(idLeft, idPxl, bounds[0]);
  desc2.putUnitDouble(idBtom, idPxl, bounds[3]);
  desc2.putUnitDouble(idRght, idPxl, bounds[2]);

  desc.putObject(idT, idRctn, desc2);
  executeAction(idSbtF, desc, DialogModes.NO);
}

function selectionToChannel(name) {
  var doc = app.activeDocument;
  var channel = doc.channels.add();
  channel.name = name;
  channel.kind = ChannelType.SELECTEDAREA;
  doc.selection.store(doc.channels.getByName(name), SelectionType.EXTEND);
  return channel
}

function isLayerSet(layer) {
  return layer.typename == 'LayerSet'
}

function contentAwareFill() {
  try { var SB = activeDocument.selection.bounds }
  catch (e) { return }
  var desc = new ActionDescriptor();
  desc.putEnumerated(cTID("Usng"), cTID("FlCn"), stringIDToTypeID("contentAware"))
  executeAction(cTID("Fl  "), desc, DialogModes.NO)
}

function invertSelection() {
  var idInvs = cTID("Invs");
  executeAction(idInvs, undefined, DialogModes.NO);
}

function deletePixels() {
  var idDlt = cTID("Dlt ");
  executeAction(idDlt, undefined, DialogModes.NO);
}

function deselect() {
  var desc = selectionDescriptor()
  desc.putEnumerated(idT, idOrdn, idNone);
  executeAction(idsetd, desc, DialogModes.NO);
}

function selectionFromMultipleRects(rects) {
  var doc = app.activeDocument
  var lineSubPathArray = new Array();
  for (var i = 0; i < rects.length; i++) {
    var rectLines = lineArrayFromRect(rects[i])
    lineSubPathArray[i] = new SubPathInfo;
    lineSubPathArray[i].operation = ShapeOperation.SHAPEADD;
    lineSubPathArray[i].closed = true;
    lineSubPathArray[i].entireSubPath = rectLines;
  }

  var myPathItem = doc.pathItems.add("path", lineSubPathArray);
  myPathItem.makeSelection()
  doc.pathItems.removeAll()
}

// Rect = [x1,y1,x2,y2]
function lineArrayFromRect(rect) {
  var x1 = rect[0], y1 = rect[1], x2 = rect[2], y2 = rect[3]
  var f = 72 / app.activeDocument.resolution
  var A = [x1 * f, y1 * f]
  var B = [x2 * f, y1 * f]
  var C = [x2 * f, y2 * f]
  var D = [x1 * f, y2 * f]
  var rect = [A, B, C, D]

  var lineArray = new Array()

  for (var n = 0; n < rect.length; n++) {
    lineArray[n] = new PathPointInfo
    lineArray[n].kind = PointKind.CORNERPOINT
    lineArray[n].anchor = rect[n]
    lineArray[n].leftDirection = rect[n]
    lineArray[n].rightDirection = rect[n]
  };
  return lineArray
}

function selectionBoundsToNewLayer(bounds) {
  select(bounds)
  copySelectedPixels()
  pastePixels()
}

function selectionFromVisiblePixels() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putProperty(idChnl, idfsel);
  desc.putReference(idnull, ref);
  var ref2 = new ActionReference();
  var idTrsp = charIDToTypeID("Trsp");
  ref2.putEnumerated(idChnl, idChnl, idTrsp);
  desc.putReference(idT, ref2);
  executeAction(idsetd, desc, DialogModes.NO);
}

function selectionFromVectorMask() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putProperty(idChnl, idfsel);
  desc.putReference(idnull, ref);
  var ref2 = new ActionReference();
  var idvectorMask = sTID("vectorMask");
  ref2.putEnumerated(idPath, idPath, idvectorMask);
  ref2.putEnumerated(idLyr, idOrdn, idTrgt);
  desc.putReference(idT, ref2);
  var idVrsn = cTID("Vrsn");
  desc.putInteger(idVrsn, 1);
  var idvectorMaskParams = sTID("vectorMaskParams");
  desc.putBoolean(idvectorMaskParams, true);
  executeAction(idsetd, desc, DialogModes.NO);
}

function selectionFromVisible() {
  var lay = app.activeDocument.activeLayer
  if (isShapeLayer(lay)) {
    selectionFromVectorMask()
  } else {
    selectionFromVisiblePixels()
  }
}

// ------- Masks

function copyMaskToLayers(fromLayer, toLayers) {
  var doc = app.activeDocument
  doc.activeLayer = fromLayer
  addMaskToSelection()
  var selection_channel = selectionToChannel("Stored Selection (" + fromLayer.name + ")")
  for (var i = 0; i < toLayers.length; i++) {
    doc.selection.load(selection_channel, SelectionType.REPLACE)
    doc.activeLayer = toLayers[i]
    if (hasLayerMask()) {
      doc.selection.invert()
      selectMask()
      fillBlack()
    } else {
      createNewMask()
    }
  }
  selection_channel.remove()
}

function selectMask() {
  var idslct = cTID("slct");
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  var idMsk = cTID("Msk ");
  ref.putEnumerated(idChnl, idChnl, idMsk);
  desc.putReference(idnull, ref);
  var idMkVs = cTID("MkVs");
  desc.putBoolean(idMkVs, false);
  executeAction(idslct, desc, DialogModes.NO);
}

function createNewMask() {
  _newMask(false)
}

function createNewMaskFromSelection() {
  _newMask(true)
}

function _newMask(fromSelection) {
  var desc = new ActionDescriptor();
  desc.putClass(idNw, idChnl);
  var idAt = cTID("At  ");
  var ref = new ActionReference();
  ref.putEnumerated(idChnl, idChnl, idMsk);
  desc.putReference(idAt, ref);
  var idUsng = cTID("Usng");
  var idUsrM = cTID("UsrM");
  var idRvlA = cTID("RvlA");
  var idRvlS = cTID("RvlS");
  var rvl = fromSelection ? idRvlS : idRvlA
  desc.putEnumerated(idUsng, idUsrM, rvl);
  executeAction(idMk, desc, DialogModes.NO);
}

function addMaskToSelection() {
  var desc = selectionDescriptor()
  var ref = new ActionReference();
  ref.putEnumerated(idChnl, idChnl, idMsk);
  desc.putReference(idT, ref);
  executeAction(idsetd, desc, DialogModes.NO);
}

function hasLayerMask() {
  var hasLayerMask = false;
  try {
    var ref = new ActionReference();
    var keyUserMaskEnabled = cTID('UsrM');
    ref.putProperty(cTID('Prpr'), keyUserMaskEnabled);
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    var desc = executeActionGet(ref);
    if (desc.hasKey(keyUserMaskEnabled)) {
      hasLayerMask = true;
    }
  } catch (e) {
    hasLayerMask = false;
  }
  return hasLayerMask;
}

function applyMask() {
  var idDlt = cTID("Dlt ");
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putEnumerated(idChnl, idOrdn, idTrgt);
  desc.putReference(idnull, ref);
  var idAply = cTID("Aply");
  desc.putBoolean(idAply, true);
  executeAction(idDlt, desc, DialogModes.NO);

}

// ------- Document

function newDocumentSameSettings(name) {
  var docSize = _docSize()
  app.documents.add(docSize.width, docSize.height, app.activeDocument.resolution, name, NewDocumentMode.rgb)
}

function _docSize() {
  usePixelUnits()
  var size = {
    width: app.activeDocument.width.as("px"),
    height: app.activeDocument.height.as("px")
  }
  resetUnits()
  return size
}

function duplicateActiveToDoc(targetDocName) {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putEnumerated(idLyr, idOrdn, idTrgt);
  desc.putReference(idnull, ref);
  var ref2 = new ActionReference();
  ref2.putName(cTID('Dcmn'), targetDocName);
  desc.putReference(cTID('T   '), ref2);
  desc.putInteger(cTID('Vrsn'), 2);
  executeAction(cTID('Dplc'), desc, DialogModes.NO);
}

function trimTransparentPixel(top, right, bottom, left) {
  var idtrim = sTID("trim");
  var desc = new ActionDescriptor();
  var idtrimBasedOn = sTID("trimBasedOn");
  var idtrimBasedOn = sTID("trimBasedOn");
  var idTrns = cTID("Trns");
  desc.putEnumerated(idtrimBasedOn, idtrimBasedOn, idTrns);
  desc.putBoolean(idTop, top);
  desc.putBoolean(idBtom, bottom);
  desc.putBoolean(idLeft, left);
  desc.putBoolean(idRght, right);
  executeAction(idtrim, desc, DialogModes.NO);
}

function closeDocNoSave() {
  var idCls = cTID("Cls ");
  var desc = new ActionDescriptor();
  var idSvng = cTID("Svng");
  var idYsN = cTID("YsN ");
  var idN = cTID("N   ");
  desc.putEnumerated(idSvng, idYsN, idN);
  executeAction(idCls, desc, DialogModes.NO);
}

// ------- Colors

function _grey() {
  return newColor(128, 128, 128)
}

function newColor(r, g, b) {
  var c = new SolidColor
  c.rgb.red = r
  c.rgb.green = g
  c.rgb.blue = b
  return c
}

function applySolidFillToActiveLayer(r, g, b) {
  var desc = targetLayerFxDescriptor()

  var desc2 = new ActionDescriptor();
  desc2.putUnitDouble(idScl, idPrc, 100.000000);

  var desc3 = new ActionDescriptor();
  desc3.putEnumerated(idMd, idBlnM, idNrml);

  var desc4 = new ActionDescriptor();
  desc4.putDouble(idRd, r);
  desc4.putDouble(idGrn, g);
  desc4.putDouble(idBl, b);

  desc3.putObject(idClr, idRGBC, desc4);
  desc3.putUnitDouble(idOpct, idPrc, 100.000000);

  desc2.putObject(idSoFi, idSoFi, desc3);
  desc.putObject(idT, idLefx, desc2);
  executeAction(idsetd, desc, DialogModes.NO);
}

function changeSolidColor(layerId, red, green, blue) {

  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putIdentifier(idcontentLayer, layerId);
  desc.putReference(idnull, ref);

  var desc2 = new ActionDescriptor();
  desc2.putDouble(idRd, red);
  desc2.putDouble(idGrn, green);
  desc2.putDouble(idBl, blue);

  var desc3 = new ActionDescriptor();
  desc3.putObject(idClr, idRGBC, desc2);

  desc.putObject(idT, idsolidColorLayer, desc3);
  executeAction(idsetd, desc, DialogModes.NO);
}

function newColorLayer(color) {
  var desc = contentLayerDescriptor()

  var idUsng = cTID("Usng");
  var desc2 = new ActionDescriptor();
  var idType = cTID("Type");

  var desc4 = new ActionDescriptor();
  desc4.putDouble(idRd, color.rgb.red);
  desc4.putDouble(idGrn, color.rgb.green);
  desc4.putDouble(idBl, color.rgb.blue);

  var desc3 = new ActionDescriptor();
  desc3.putObject(idClr, idRGBC, desc4);

  desc2.putObject(idType, idsolidColorLayer, desc3);

  desc.putObject(idUsng, idcontentLayer, desc2);
  executeAction(idMk, desc, DialogModes.NO);
}

function fillBlack() {
  var idFl = charIDToTypeID("Fl  ");
  var desc = new ActionDescriptor();
  var idUsng = charIDToTypeID("Usng");
  var idFlCn = charIDToTypeID("FlCn");
  var idBlck = charIDToTypeID("Blck");
  desc.putEnumerated(idUsng, idFlCn, idBlck);
  desc.putUnitDouble(idOpct, idPrc, 100.000000);
  desc.putEnumerated(idMd, idBlnM, idNrml);
  executeAction(idFl, desc, DialogModes.NO);
}

function fill(r, g, b, percent) {
  var idFl = cTID("Fl  ");
  var desc = new ActionDescriptor();
  var idUsng = cTID("Usng");
  var idFlCn = cTID("FlCn");

  desc.putEnumerated(idUsng, idFlCn, idClr);

  var desc2 = new ActionDescriptor();
  desc2.putDouble(idRd, r);
  desc2.putDouble(idGrn, g);
  desc2.putDouble(idBl, b);
  desc.putObject(idClr, idRGBC, desc2);

  desc.putUnitDouble(idOpct, idPrc, percent || 100);
  desc.putEnumerated(idMd, idBlnM, idNrml);
  executeAction(idFl, desc, DialogModes.NO);
}

function colorAt(x, y) {
  var pointSample = app.activeDocument.colorSamplers.add([x, y]);
  var color = pointSample.color
  pointSample.remove()
  return color
}


// ------- Styles

function scaleStylesOfIndices(layerIndices, percent) {
  for (var i = 0; i < layerIndices.length; i++) {
    if (layerIdxHasStyle(layerIndices[i])) {
      makeActiveByIndex(layerIndices[i], false)
      scaleActiveLayerEffects(percent)
    }
  }
}

function scaleActiveLayerEffects(percent) {
  var idscaleEffectsEvent = sTID("scaleEffectsEvent");
  var desc = new ActionDescriptor();
  desc.putUnitDouble(idScl, idPrc, percent);
  executeAction(idscaleEffectsEvent, desc, DialogModes.NO);
}

function layerHasStyle(layer) {
  var desc = layerDescById(layer.id)
  return desc.hasKey(sTID('layerEffects'))
}

function layerIdxHasStyle(index) {
  var desc = layerDescByIdx(index)
  return desc.hasKey(sTID('layerEffects'))
}



// ------- Bounds, Sizes & Units

/**
 * @return bounds: [x1,y1,x2,y2]
 * @param {*} includeLayers 
 */
function getActivePixelBounds(includeLayers) {
  usePixelUnits()
  var bounds
  var selection = app.activeDocument.selection

  if (selection.active()) {
    bounds = pixelBounds(selection.bounds)
  } else if (includeLayers) {
    var selectedLayers = getSelectedLayers()
    if (selectedLayers.length) {
      bounds = getPixelBoundsFromLayers(selectedLayers)
    }
  } else {
    var doc = app.activeDocument
    bounds = pixelBounds([0, 0, doc.width, doc.height])
  }
  resetUnits()
  return bounds
}

function getPixelBoundsFromLayers(layers) {
  usePixelUnits()
  var bounds = []
  for (var i = 0; i < layers.length; i++) {
    bounds[0] = isNaN(bounds[0]) ? layers[i].bounds[0].as('px') : Math.min(bounds[0], layers[i].bounds[0]),
      bounds[1] = isNaN(bounds[1]) ? layers[i].bounds[1].as('px') : Math.min(bounds[1], layers[i].bounds[1]),
      bounds[2] = isNaN(bounds[2]) ? layers[i].bounds[2].as('px') : Math.max(bounds[2], layers[i].bounds[2]),
      bounds[3] = isNaN(bounds[3]) ? layers[i].bounds[3].as('px') : Math.max(bounds[3], layers[i].bounds[3])
  }
  resetUnits()
  return bounds
}

function pixelBounds(bounds) {
  usePixelUnits()
  var pxBounds = []
  for (var i = 0; i < bounds.length; i++) {
    pxBounds[i] = bounds[i] == 0 ? 0 : bounds[i].as('px')
  }

  resetUnits()
  return pxBounds
}

function getActiveCenter(includeLayers) {
  usePixelUnits()
  var selectedLayers = getSelectedLayers()
  var sLength = selectedLayers.length
  var selection = app.activeDocument.selection
  var center
  if (selection.active()) {
    center = [
      (selection.bounds[0] + (selection.bounds[2] - selection.bounds[0]) / 2).as('px'),
      (selection.bounds[1] + (selection.bounds[3] - selection.bounds[1]) / 2).as('px')
    ]
  } else if (sLength && includeLayers) {
    var lBounds = getPixelBoundsFromLayers(selectedLayers)
    center = getCenterFromBounds(lBounds)
  } else {
    var docSize = _docSize()
    center = [
      docSize.width / 2,
      docSize.height / 2
    ]
  }
  resetUnits()
  return center
}

function getCenterFromBounds(bounds) {
  return [
    bounds[0] + (bounds[2] - bounds[0]) / 2,
    bounds[1] + (bounds[3] - bounds[1]) / 2
  ]
}

/**
 * 
 * @param {*} layers 
 * @param {*} width true, height: false
 */
function getMultipleLayersSizeSum(layers, width) {
  var add = width ? 0 : 1
  var size = 0
  for (var i = 0; i < layers.length; i++) {
    var bounds = pixelBounds(layers[i].bounds)
    size += bounds[2 + add] - bounds[0 + add]
  }
  return size
}

function toPx(uvObj, percentBase) {
  usePixelUnits()
  if (uvObj.value == 0) {
    return 0
  }
  var uv = UnitValue(uvObj.value, uvObj.unit || 'px')
  if (uvObj.unit == '%') {
    var _percentBase = percentBase == undefined ? 1000 : percentBase
    var baseUnit = UnitValue(_percentBase, "px")
    uv.baseUnit = baseUnit
  }
  var pxVal = uv.as("px")
  resetUnits()
  return pxVal
}

function usePixelUnits() {
  rememberedUnits.push(app.preferences.rulerUnits)
  app.preferences.rulerUnits = Units.PIXELS
  setBaseUnit()
}

function setBaseUnit() {
  var res = app.activeDocument.resolution
  UnitValue.baseUnit = UnitValue(1 / res, "in")
}

function resetUnits() {
  app.preferences.rulerUnits = rememberedUnits[rememberedUnits.length - 1]
  rememberedUnits.pop()
}


// -------- Math

function angleFromMatrix(yy, xy) {
  var toDegs = 180 / Math.PI;
  return Math.atan2(yy, xy) * toDegs - 90;
}

function multiplicationRoundingQuot(multiplier, multiplicand) {
  var mResult = multiplier * multiplicand
  var roundingQuot = Math.round(mResult) / mResult
  return roundingQuot
}


// -------- Smart Objects

function getSmartObjectRotation() {
  var points = getSmartObjectCorners();
  var w = points[0][0] - points[1][0];
  var h = points[0][1] - points[1][1];
  var angle = Math.atan(h / w) * 180.0 / Math.PI;
  return angle
}

function getSmartObjectCorners() {
  try {
    var r = targetLayerRef()
    var d;
    try { d = executeActionGet(r); } catch (e) { alert(e); return; }
    try { d = d.getObjectValue(sTID("smartObjectMore")); } catch (e) { alert(e); return; }
    try { d = d.getList(sTID("transform")); } catch (e) { alert(e); return; }
    var ret = [[d.getDouble(0), d.getDouble(1)],
    [d.getDouble(2), d.getDouble(3)],
    [d.getDouble(4), d.getDouble(5)],
    [d.getDouble(6), d.getDouble(7)]];
    return ret;
  }
  catch (e) { alert(e); }
}

function smartObjectInfo() {
  var r = targetLayerRef()
  var obj = executeActionGet(r).getObjectValue(sTID("smartObjectMore"))
  with (obj) {
    var _tmp;
    _tmp = getList(sTID("transform"));
    var transform = new Array();
    for (var i = 0; i < _tmp.count; i += 2) transform.push([_tmp.getDouble(i), _tmp.getDouble(i + 1)]);
    _tmp = getList(sTID("nonAffineTransform"));
    var nonAffineTransform = new Array();
    for (var i = 0; i < _tmp.count; i += 2) nonAffineTransform.push([_tmp.getDouble(i), _tmp.getDouble(i + 1)]);

    _tmp = getObjectValue(sTID("warp"));

    var warp = new Object({
      warpStyle: typeIDToStringID(_tmp.getEnumerationValue(sTID("warpStyle"))),
      warpValue: _tmp.getDouble(sTID("warpValue")),
      warpPerspective: _tmp.getDouble(sTID("warpPerspective")),
      warpPerspectiveOther: _tmp.getDouble(sTID("warpPerspective")),
      warpRotate: typeIDToStringID(_tmp.getEnumerationValue(sTID("warpRotate"))),
      uOrder: _tmp.getInteger(sTID("uOrder")),
      vOrder: _tmp.getInteger(sTID("vOrder")),

      bounds: new Object({
        top: _tmp.getObjectValue(sTID("bounds")).getUnitDoubleValue(sTID("top")),
        left: _tmp.getObjectValue(sTID("bounds")).getUnitDoubleValue(sTID("left")),
        bottom: _tmp.getObjectValue(sTID("bounds")).getUnitDoubleValue(sTID("bottom")),
        right: _tmp.getObjectValue(sTID("bounds")).getUnitDoubleValue(sTID("right")),
      }),
    });

    _tmp = getObjectValue(sTID("size"));
    var size = new Object({
      width: _tmp.getDouble(sTID("width")),
      height: _tmp.getDouble(sTID("height")),
    });
  }
  return {
    transform: transform,
    nonAffineTransform: nonAffineTransform,
    warp: warp.toSource(),
    size: size.toSource()
  }
}

function editContentsOfActiveSO() {
  var idplacedLayerEditContents = sTID("placedLayerEditContents");
  var desc = new ActionDescriptor();
  executeAction(idplacedLayerEditContents, desc, DialogModes.NO);
}

function createSmartObject() {
  try {
    var id325 = stringIDToTypeID("newPlacedLayer");
    executeAction(id325, undefined, DialogModes.NO);
  }
  catch (e) {
    alert("Failed to make smart object -" + e)
  }
}

// -------- Guides

function resetGuides() {
  var idclearAllGuides = sTID("clearAllGuides");
  executeAction(idclearAllGuides, undefined, DialogModes.NO);
}

/**
 * 
 * @param {*} orientation Vrtc (Vertical) or Hrzn (Horizontal)
 * @param {*} pixelposition 
 */
function createGuideLine(orientation, pixelposition) {
  var desc = new ActionDescriptor();
  var desc2 = new ActionDescriptor();
  desc2.putUnitDouble(idPstn, idPxl, pixelposition);
  var _orientation = cTID(orientation);
  desc2.putEnumerated(idOrnt, idOrnt, _orientation);
  var idGd = cTID("Gd  ");
  desc.putObject(idNw, idGd, desc2);
  executeAction(idMk, desc, DialogModes.NO);
}

function newGuideLayout(replace, colCount, colGutter, rowCount, rowGutter, marginTop, marginLeft, marginBottom, marginRight) {
  var desc = new ActionDescriptor();
  var desc2 = new ActionDescriptor();

  desc.putBoolean(sTID("replace"), replace);
  desc.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
  if (colCount) {
    desc2.putInteger(sTID("colCount"), colCount);
    desc2.putUnitDouble(sTID("colGutter"), idPxl, colGutter);
  }
  if (rowCount) {
    desc2.putInteger(sTID("rowCount"), rowCount);
    desc2.putUnitDouble(sTID("rowGutter"), idPxl, rowGutter);
  }
  if (marginTop) {
    desc2.putUnitDouble(sTID("marginTop"), idPxl, marginTop);
  }
  if (marginRight) {
    desc2.putUnitDouble(sTID("marginRight"), idPxl, marginRight);
  }
  if (marginBottom) {
    desc2.putUnitDouble(sTID("marginBottom"), idPxl, marginBottom);
  }
  if (marginLeft) {
    desc2.putUnitDouble(sTID("marginLeft"), idPxl, marginLeft);
  }
  desc.putObject(sTID("guideLayout"), sTID("guideLayout"), desc2);
  desc.putEnumerated(sTID("guideTarget"), sTID("guideTarget"), sTID("guideTargetCanvas"));
  executeAction(stringIDToTypeID("newGuideLayout"), desc, DialogModes.NO);
}






























