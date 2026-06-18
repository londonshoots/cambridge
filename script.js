(function(){
    var script = {
 "mouseWheelEnabled": true,
 "class": "Player",
 "start": "this.playAudioList([this.audio_D6CF2579_D85F_AB75_41A8_D0865BDF8D1F]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "propagateClick": true,
 "scripts": {
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "registerKey": function(key, value){  window[key] = value; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "unregisterKey": function(key){  delete window[key]; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "existsKey": function(key){  return key in window; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getKey": function(key){  return window[key]; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); }
 },
 "backgroundPreloadEnabled": false,
 "desktopMipmappingEnabled": false,
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15"
 ],
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "downloadEnabled": false,
 "minHeight": 20,
 "width": "100%",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "left",
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "minWidth": 20,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "vrPolyfillScale": 0.6,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.73,
  "pitch": 0
 },
 "id": "camera_D7087289_D925_90EF_41C4_341DD1838C3C",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_t.jpg",
 "label": "2.Sitting Area",
 "id": "panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_CDB8087D_D8FC_B9DB_41D1_0D5427F11764",
  "this.overlay_CD2C6DE1_D8FD_DAEC_41E9_84CF95832E54",
  "this.overlay_CD57AB9F_D8F4_5F52_41D1_9D08FE722749",
  "this.overlay_CD7475C0_D8F5_EB2F_41E7_39BD80CC891F"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7",
   "yaw": -74.31,
   "distance": 1,
   "backwardYaw": -175.83
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048",
   "yaw": 104.83,
   "distance": 1,
   "backwardYaw": -88.75
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4",
   "yaw": 45.04,
   "distance": 1,
   "backwardYaw": 51.81
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545",
   "yaw": -35.85,
   "distance": 1,
   "backwardYaw": -111.65
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -89.4,
    "path": "shortest",
    "yawSpeed": 14.56,
    "pitchSpeed": 7.75,
    "targetPitch": -17.85,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 5)",
    "targetYaw": 172.12,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -31.26,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D77E42C5_D925_9064_41E5_64FD538980C7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -75.17,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 109.63,
    "path": "shortest",
    "yawSpeed": 88.43,
    "pitchSpeed": 44.51,
    "targetPitch": -25.48,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 2)",
    "targetYaw": 41.27,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7A3430E_D925_91E4_41E9_D38A352BF2D1",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_t.jpg",
 "label": "21.Bedroom 2 Ensuite",
 "id": "panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_FB4591E9_D84D_EA2C_41AD_954CB005F6D6"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE",
   "yaw": 123,
   "distance": 1,
   "backwardYaw": -9.91
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -128.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -92.59,
    "path": "shortest",
    "yawSpeed": 15.81,
    "pitchSpeed": 8.37,
    "targetPitch": -18.26,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 4)",
    "targetYaw": -178.97,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -6.94,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7000031_D925_903F_41E2_A85A63AFB334",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 91.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 86.88,
    "path": "shortest",
    "yawSpeed": 6.42,
    "pitchSpeed": 3.7,
    "targetPitch": -15.05,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 3)",
    "targetYaw": -6.34,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -15.5,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D731A014_D926_6FE5_41DD_47F5185C9BD0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.46,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7D31382_D925_90DC_41E3_2E571EE15F2D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.88,
  "pitch": -38.09
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 109.63,
    "path": "shortest",
    "yawSpeed": 21.11,
    "pitchSpeed": 11.01,
    "targetPitch": -25.48,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 2)",
    "targetYaw": 41.27,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D64D83E9_D925_902C_41E6_0FD1C64AC191",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_t.jpg",
 "label": "10.Toilet",
 "id": "panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C41956FF_D834_5678_4199_8CCD4BAAE15C"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D",
   "yaw": 81.74,
   "distance": 1,
   "backwardYaw": -115.99
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PlayList",
 "items": [
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7",
   "camera": "this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF",
   "camera": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048",
   "camera": "this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4",
   "camera": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D6F44967_D874_5895_41E4_2181B518D384",
   "camera": "this.panorama_D6F44967_D874_5895_41E4_2181B518D384_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB",
   "camera": "this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB",
   "camera": "this.panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908",
   "camera": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D",
   "camera": "this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545",
   "camera": "this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 0)",
   "media": "this.panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 95.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 78.1,
    "path": "shortest",
    "yawSpeed": 17.21,
    "pitchSpeed": 9.07,
    "targetPitch": -23.63,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 7)",
    "targetYaw": 20.04,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -18.58,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D712E2A7_D925_9024_41DC_DE36D6AE22FD",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 43.79,
  "pitch": -24.57
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_camera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_t.jpg",
 "label": "16.Bedroom 1 Back",
 "id": "panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_F80F7E19_D85F_D9C7_41EA_A1F29AF89E4D",
  "this.overlay_F9F4F55D_D85C_EA79_41E6_EE91253726AD",
  "this.overlay_F981F5B7_D85C_EA37_41D9_A7D1F35895DC"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3",
   "yaw": 124.93,
   "distance": 1,
   "backwardYaw": -85.35
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB",
   "yaw": -159.37,
   "distance": 1,
   "backwardYaw": -117.14
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB",
   "yaw": 127.54,
   "distance": 1,
   "backwardYaw": -169.76
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.94,
  "pitch": -8.92
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.1,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -89.4,
    "path": "shortest",
    "yawSpeed": 11.18,
    "pitchSpeed": 6.07,
    "targetPitch": -17.85,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 5)",
    "targetYaw": 172.12,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -31.26,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_C93D24FA_D925_902C_41DA_E5C810AE725F",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_t.jpg",
 "label": "1.Entrance",
 "id": "panorama_D592EC98_D87C_59BB_41E7_756107042EB7",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_CB30CE54_D8D4_593E_41E5_146CDE358B17",
  "this.overlay_CC97A0D0_D8CC_A93E_4152_3238803BD150",
  "this.overlay_CC1E6672_D8F4_A9E4_41C7_1568057F0BA4"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF",
   "yaw": -175.83,
   "distance": 1,
   "backwardYaw": -74.31
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D",
   "yaw": 84.21,
   "distance": 1,
   "backwardYaw": 66.87
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 64.01,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 174.86,
    "path": "shortest",
    "yawSpeed": 32.54,
    "pitchSpeed": 16.7,
    "targetPitch": -23.1,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 10)",
    "targetYaw": 59.09,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -22.01,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D75BC2F0_D925_903D_41E3_82D9683C7DE2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -113.13,
  "pitch": 0
 },
 "id": "camera_D750808A_D925_90ED_4170_F331E30DFC96",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 11.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 47.83,
    "path": "shortest",
    "yawSpeed": 9.2,
    "pitchSpeed": 5.08,
    "targetPitch": -12.98,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 6)",
    "targetYaw": -102.25,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -16.18,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7D02193_D925_90E3_41E1_FC543B18E4CF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 47.83,
    "path": "shortest",
    "yawSpeed": 12.2,
    "pitchSpeed": 6.57,
    "targetPitch": -12.98,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 6)",
    "targetYaw": -102.25,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -16.18,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D637339F_D925_90E3_41DE_880561E33BD8",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.88,
  "pitch": -15.05
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 3)",
    "targetYaw": -6.34,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -15.5,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 4.17,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 81.77,
    "path": "shortest",
    "yawSpeed": 28.32,
    "pitchSpeed": 14.6,
    "targetPitch": -14.76,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 1)",
    "targetYaw": 174.98,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.27,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7216FF2_D926_703D_41D0_39A4AEBF359C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 105.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 109.63,
    "path": "shortest",
    "yawSpeed": 13.09,
    "pitchSpeed": 7.01,
    "targetPitch": -25.48,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 2)",
    "targetYaw": 41.27,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D74CE06C_D925_9025_41E3_70438D74FDBF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.26,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D4D62233_D925_903C_41E9_08DEEEB4B097",
 "automaticZoomSpeed": 10
},
{
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "gyroscopeEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "gyroscopeVerticalDraggingEnabled": false,
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "touchControlMode": "drag_acceleration",
 "mouseControlMode": "drag_rotation"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 170.09,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D67D33D8_D925_906D_41E3_82846D7089B4",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.88,
  "pitch": 0.29
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -95.79,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 81.77,
    "path": "shortest",
    "yawSpeed": 62.63,
    "pitchSpeed": 31.67,
    "targetPitch": -14.76,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 1)",
    "targetYaw": 174.98,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.27,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7985108_D925_91ED_41B5_56F87412C774",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78.1,
  "pitch": -23.63
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 7)",
    "targetYaw": 20.04,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -18.58,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_camera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_t.jpg",
 "label": "13.Upper Floor Landing",
 "id": "panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C71E92C8_D84F_AEB1_41B7_94324FE0B3BA",
  "this.overlay_C66F620C_D84D_E9B3_41D5_79D87EBA5AA6",
  "this.overlay_C743F8EA_D84C_7A74_41EA_3F94B9844382"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE",
   "yaw": -8.64,
   "distance": 1,
   "backwardYaw": 159.19
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D",
   "yaw": 134.89,
   "distance": 1,
   "backwardYaw": 29.27
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB",
   "yaw": -90.19,
   "distance": 1,
   "backwardYaw": 48.68
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -68.99,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_C91ED527_D925_9023_41C8_8F618979A816",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_t.jpg",
 "label": "15.Bedroom 1 Middle",
 "id": "panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_F8DEEB6F_D854_7E42_41E2_A881C06511D7",
  "this.overlay_F8A98025_D85C_A9C3_41E2_81DDE9F4143D"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E",
   "yaw": -85.35,
   "distance": 1,
   "backwardYaw": 124.93
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB",
   "yaw": 115.39,
   "distance": 1,
   "backwardYaw": -160.27
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_t.jpg",
 "label": "7.Kitchen Area Cooker",
 "id": "panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C4874B1D_D8D4_BF69_41E1_BF13D47EE82B",
  "this.overlay_C3A492AB_D8D4_6EB9_41E1_77C1268F66F8"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB",
   "yaw": -84.6,
   "distance": 1,
   "backwardYaw": -81.69
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_t.jpg",
 "label": "11.Dining Area",
 "id": "panorama_D5831EEC_D874_599D_41C8_A190F61CD545",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C472FBDE_D837_DEB6_41B6_BA9609048C15",
  "this.overlay_C46BBA50_D835_D98C_41AB_B9B911D47859",
  "this.overlay_C5140703_D834_B792_41E1_75F4A87F6B1F"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF",
   "yaw": -111.65,
   "distance": 1,
   "backwardYaw": -35.85
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D",
   "yaw": 89.36,
   "distance": 1,
   "backwardYaw": 59.38
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048",
   "yaw": -155.01,
   "distance": 1,
   "backwardYaw": -64.51
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.59,
  "pitch": -18.26
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 4)",
    "targetYaw": -178.97,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -6.94,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 104.35,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D74682E0_D925_905D_41DD_F7C73A6DE229",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.81,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D732527C_D925_9024_41EA_4B18286AEA41",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 47.83,
  "pitch": -12.98
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 6)",
    "targetYaw": -102.25,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -16.18,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_camera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_t.jpg",
 "label": "18.Bedroom 1 Shower",
 "id": "panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_FAD06EC9_D857_B650_41EA_19056EF5DFF9"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB",
   "yaw": -169.79,
   "distance": 1,
   "backwardYaw": 1.52
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -82.11,
  "pitch": -8.23
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -48.62,
    "path": "shortest",
    "yawSpeed": 22.27,
    "pitchSpeed": 11.59,
    "targetPitch": -12.5,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 1)",
    "targetYaw": -114.58,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -20.64,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D4D04240_D925_905D_41A6_B5BAD9589FA7",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_t.jpg",
 "label": "12.Stairs Landing",
 "id": "panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C68AF0BA_D834_EAE2_41C7_A0B1D09957B9",
  "this.overlay_C543EF9F_D835_F6D7_41D6_13F682D819FC"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7",
   "yaw": 66.87,
   "distance": 1,
   "backwardYaw": 84.21
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB",
   "yaw": 29.27,
   "distance": 1,
   "backwardYaw": 134.89
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -120.62,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 174.86,
    "path": "shortest",
    "yawSpeed": 83.56,
    "pitchSpeed": 42.09,
    "targetPitch": -23.1,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 10)",
    "targetYaw": 59.09,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -22.01,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D6513404_D925_97E5_41E6_44B57B294C0D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -45.11,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7FD6148_D925_906C_41DE_4A082D842455",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_t.jpg",
 "label": "5.Kitchen Island",
 "id": "panorama_D6F44967_D874_5895_41E4_2181B518D384",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C0C8007D_D8D4_E9D1_41D9_4E18C8459D4D",
  "this.overlay_C188BB12_D8DD_BF51_41E9_97169BF71D04",
  "this.overlay_C1BCF827_D8DC_B97D_41B7_75D020924977",
  "this.overlay_C1DD8B3D_D8DC_DF4C_41E1_AF74A3A96082"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4",
   "yaw": 9.9,
   "distance": 1,
   "backwardYaw": -157.19
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB",
   "yaw": -160.73,
   "distance": 1,
   "backwardYaw": -168.04
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -80.24,
  "pitch": -5.16
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -48.62,
  "pitch": -12.5
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 1)",
    "targetYaw": -114.58,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -20.64,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5831EEC_D874_599D_41C8_A190F61CD545_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.36,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_C960A552_D925_907D_41EB_079158E17D7D",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_t.jpg",
 "label": "9.Kitchen Area Store Room Toilet",
 "id": "panorama_D582F5D5_D875_EB8F_41E0_6029707E143D",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C33C0A93_D8CC_DE80_41C8_8BEBD44A857E",
  "this.overlay_C3C066E7_D8CC_568D_41D9_A8CBA5F26328",
  "this.overlay_C4AFB325_D834_AF8F_41E3_2AC53B1ED34F"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908",
   "yaw": -40.73,
   "distance": 1,
   "backwardYaw": -91.57
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A",
   "yaw": -115.99,
   "distance": 1,
   "backwardYaw": 81.74
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545",
   "yaw": 59.38,
   "distance": 1,
   "backwardYaw": 89.36
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -64.61,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7C21374_D925_9024_41BD_D7B5A5CCF460",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_t.jpg",
 "label": "3.Sitting Area Balcony",
 "id": "panorama_D59246B3_D87B_E98D_41E1_6FAB29497048",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_CE862609_D8F5_E93A_41D2_0FC3740452F6",
  "this.overlay_CFB43053_D8CD_E92A_41B8_D3BAA87B7CF6",
  "this.overlay_CFED9335_D8CD_EF69_41E3_634C440DC39C"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF",
   "yaw": -88.75,
   "distance": 1,
   "backwardYaw": 104.83
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545",
   "yaw": -64.51,
   "distance": 1,
   "backwardYaw": -155.01
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4",
   "yaw": -3.21,
   "distance": 1,
   "backwardYaw": 4.39
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 86.88,
    "path": "shortest",
    "yawSpeed": 12.18,
    "pitchSpeed": 6.57,
    "targetPitch": -15.05,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 3)",
    "targetYaw": -6.34,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -15.5,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D6B3742D_D925_9024_41EB_0B116A1F8ADD",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.63,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D723725E_D925_9065_41CD_4F7E01B6D3B5",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 26.14,
  "pitch": -19.14
 },
 "id": "panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.86,
  "pitch": -23.1
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 10)",
    "targetYaw": 59.09,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -22.01,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -131.32,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D71D4299_D925_90EF_41C2_9E3CD7E38F17",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -57,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_C9100542_D925_905D_4192_F555EE31993F",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_t.jpg",
 "label": "19.Bedroom 2 Entrance",
 "id": "panorama_D583DF16_D874_588C_41E0_713A9F538CDE",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_FA5E9ACD_D854_5E6C_41E3_530F214FD7F4",
  "this.overlay_FBFE1908_D84C_DBD6_41D5_CD52179F9CB1",
  "this.overlay_C9B58D03_D906_D46C_41E6_4AC6B10F5F03"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8",
   "yaw": -75.65,
   "distance": 1,
   "backwardYaw": 111.01
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D",
   "yaw": -9.91,
   "distance": 1,
   "backwardYaw": 123
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB",
   "yaw": 159.19,
   "distance": 1,
   "backwardYaw": -8.64
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 139.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 174.86,
    "path": "shortest",
    "yawSpeed": 12.82,
    "pitchSpeed": 6.88,
    "targetPitch": -23.1,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 10)",
    "targetYaw": 59.09,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -22.01,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D615C1CD_D925_9067_41E8_8727DF4428CF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.34,
  "pitch": -3.08
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.48,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7CF9364_D925_9025_41EA_C302C01C3967",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_t.jpg",
 "label": "14.Bedroom 1 Entrance",
 "id": "panorama_D5B702CF_D874_A99B_41E2_48A942F166CB",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C62E4D92_D854_BADB_41E7_87A958945046",
  "this.overlay_C756B2F3_D854_AE5F_41C2_59706A58E52C",
  "this.overlay_C76EF33C_D854_AFC4_41D6_B6495978FC04"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3",
   "yaw": -160.27,
   "distance": 1,
   "backwardYaw": 115.39
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E",
   "yaw": -169.76,
   "distance": 1,
   "backwardYaw": 127.54
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB",
   "yaw": 48.68,
   "distance": 1,
   "backwardYaw": -90.19
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_t.jpg",
 "label": "17.Bedroom 1 Ensuite",
 "id": "panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_F997B8A2_D854_7ACE_41CE_336879770B2E",
  "this.overlay_FACFB602_D855_E9CD_41E8_49946F61A9BB"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E",
   "yaw": -117.14,
   "distance": 1,
   "backwardYaw": -159.37
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7",
   "yaw": 1.52,
   "distance": 1,
   "backwardYaw": -169.79
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -34.08,
    "path": "shortest",
    "yawSpeed": 19.03,
    "pitchSpeed": 9.97,
    "targetPitch": -22.08,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 8)",
    "targetYaw": -104.3,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -21.32,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D6F84494_D925_90E4_41DF_30B2EFC6D03D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -84.29,
  "pitch": -22.82
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_camera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_t.jpg",
 "label": "6.Kitchen Area Balcony",
 "id": "panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C11E45F8_D8DC_6AD6_41B4_417DB1E53B33",
  "this.overlay_C1564BBB_D8D4_DF4A_41CB_51A8F1C8B493"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB",
   "yaw": -81.69,
   "distance": 1,
   "backwardYaw": -84.6
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D6F44967_D874_5895_41E4_2181B518D384",
   "yaw": -168.04,
   "distance": 1,
   "backwardYaw": -160.73
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.86,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7B410C8_D925_906F_41EB_016A42147493",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 109.63,
  "pitch": -25.48
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 2)",
    "targetYaw": 41.27,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "MediaAudio",
 "autoplay": true,
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_D6CF2579_D85F_AB75_41A8_D0865BDF8D1F.mp3",
  "oggUrl": "media/audio_D6CF2579_D85F_AB75_41A8_D0865BDF8D1F.ogg"
 },
 "id": "audio_D6CF2579_D85F_AB75_41A8_D0865BDF8D1F",
 "data": {
  "label": "Ewelina Koll Forbidden Love Marc van Linden D Gor Rework"
 }
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.24,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D78750EA_D925_902D_4195_E94607D33575",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -73.42,
  "pitch": -5.3
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -48.62,
    "path": "shortest",
    "yawSpeed": 58.09,
    "pitchSpeed": 29.41,
    "targetPitch": -12.5,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 1)",
    "targetYaw": -114.58,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -20.64,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D768604F_D925_9063_41EA_74EA1902F876",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7",
   "camera": "this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF",
   "camera": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048",
   "camera": "this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4",
   "camera": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D6F44967_D874_5895_41E4_2181B518D384",
   "camera": "this.panorama_D6F44967_D874_5895_41E4_2181B518D384_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB",
   "camera": "this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB",
   "camera": "this.panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908",
   "camera": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908_camera"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D",
   "camera": "this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "media": "this.panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545",
   "camera": "this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "media": "this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "media": "this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "media": "this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "media": "this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "media": "this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "media": "this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "media": "this.panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "media": "this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "media": "this.panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 0)",
   "media": "this.panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -92.59,
    "path": "shortest",
    "yawSpeed": 44.25,
    "pitchSpeed": 22.52,
    "targetPitch": -18.26,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 4)",
    "targetYaw": -178.97,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -6.94,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7CE7168_D925_902D_41E7_3A01D1322C50",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 24.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -48.62,
    "path": "shortest",
    "yawSpeed": 37.24,
    "pitchSpeed": 19.03,
    "targetPitch": -12.5,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 1)",
    "targetYaw": -114.58,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -20.64,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D788632B_D925_9023_41D3_EB5262AD3FD9",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 89.81,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D624F38F_D925_90E3_41D4_C62F7CE48609",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.65,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7A3E0AA_D925_902D_41B6_9EE947FE9B4A",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_t.jpg",
 "label": "20.Bedroom 2 Middle",
 "id": "panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_FB8BC18F_D84F_EAE6_41D5_3427FDB63F16"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE",
   "yaw": 111.01,
   "distance": 1,
   "backwardYaw": -75.65
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "rollOverBackgroundColor": "#000000",
 "selectedFontColor": "#FFFFFF",
 "fontFamily": "Arial",
 "children": [
  {
   "class": "MenuItem",
   "label": "1.Entrance",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  },
  {
   "class": "MenuItem",
   "label": "2.Sitting Area",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  },
  {
   "class": "MenuItem",
   "label": "3.Sitting Area Balcony",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  },
  {
   "class": "MenuItem",
   "label": "4.Sitting Area Kitchen",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  },
  {
   "class": "MenuItem",
   "label": "5.Kitchen Island",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  },
  {
   "class": "MenuItem",
   "label": "6.Kitchen Area Balcony",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  },
  {
   "class": "MenuItem",
   "label": "7.Kitchen Area Cooker",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  },
  {
   "class": "MenuItem",
   "label": "8.Kitchen Area Store Room",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  },
  {
   "class": "MenuItem",
   "label": "9.Kitchen Area Store Room Toilet",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  },
  {
   "class": "MenuItem",
   "label": "10.Toilet",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  },
  {
   "class": "MenuItem",
   "label": "11.Dining Area",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  },
  {
   "class": "MenuItem",
   "label": "12.Stairs Landing",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  },
  {
   "class": "MenuItem",
   "label": "13.Upper Floor Landing",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  },
  {
   "class": "MenuItem",
   "label": "14.Bedroom 1 Entrance",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  },
  {
   "class": "MenuItem",
   "label": "15.Bedroom 1 Middle",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  },
  {
   "class": "MenuItem",
   "label": "16.Bedroom 1 Back",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  },
  {
   "class": "MenuItem",
   "label": "17.Bedroom 1 Ensuite",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  },
  {
   "class": "MenuItem",
   "label": "18.Bedroom 1 Shower",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  },
  {
   "class": "MenuItem",
   "label": "19.Bedroom 2 Entrance",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  },
  {
   "class": "MenuItem",
   "label": "20.Bedroom 2 Middle",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  },
  {
   "class": "MenuItem",
   "label": "21.Bedroom 2 Ensuite",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "label": "Media",
 "selectedBackgroundColor": "#202020",
 "opacity": 0.4,
 "class": "Menu",
 "id": "Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "rollOverFontColor": "#FFFFFF",
 "rollOverOpacity": 0.8,
 "fontColor": "#FFFFFF",
 "backgroundColor": "#404040"
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_t.jpg",
 "label": "8.Kitchen Area Store Room",
 "id": "panorama_D5B6B97A_D875_D885_41D3_5968FB766908",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_C432A921_D8D5_DBB1_41EA_FB90DC5AD202",
  "this.overlay_C478228E_D8D4_A971_419E_3553B85B3E4D",
  "this.overlay_C3FC6ECF_D8CC_7686_41B1_1D23555CE161",
  "this.overlay_C38CBF36_D8CC_7784_41E7_2253A739BDD1"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4",
   "yaw": 113.46,
   "distance": 1,
   "backwardYaw": 145.29
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D",
   "yaw": -91.57,
   "distance": 1,
   "backwardYaw": -40.73
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.73,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D66D63CB_D925_906C_4190_3CBAEE79C149",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -55.07,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D61AF3BB_D925_902C_41E8_4BFF7F1838C8",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.21,
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D73B326C_D925_9024_41E8_58AC7F77B7BC",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "displayOriginPosition": {
  "class": "RotationalCameraDisplayPosition",
  "yaw": 81.77,
  "hfov": 165,
  "pitch": 90,
  "stereographicFactor": 0.25
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 81.77,
  "pitch": -14.76
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 1)",
    "targetYaw": 174.98,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.27,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D592EC98_D87C_59BB_41E7_756107042EB7_camera",
 "automaticZoomSpeed": 10,
 "displayMovements": [
  {
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "linear"
  },
  {
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetPitch": -14.76,
   "easing": "cubic_in_out",
   "targetStereographicFactor": 0
  }
 ]
},
{
 "vfov": 180,
 "thumbnailUrl": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_t.jpg",
 "label": "4.Sitting Area Kitchen",
 "id": "panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4",
 "pitch": 0,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "rowCount": 5,
      "colCount": 5,
      "height": 2560,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_t.jpg"
  }
 ],
 "cardboardMenu": "this.Menu_D4D0AFD7_D926_7064_41DA_34EB76F28FA3",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_CF847044_D8CC_6929_41E5_A159B40AF9AB",
  "this.overlay_CF1B0E41_D8D4_592B_41E2_2E2EB93F86DE",
  "this.overlay_C0F6AA49_D8D4_593D_41D0_1DE997EAA8BC",
  "this.overlay_C00B5C0B_D8D4_F933_41CF_754347038599"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF",
   "yaw": 51.81,
   "distance": 1,
   "backwardYaw": 45.04
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908",
   "yaw": 145.29,
   "distance": 1,
   "backwardYaw": 113.46
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048",
   "yaw": 4.39,
   "distance": 1,
   "backwardYaw": -3.21
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D6F44967_D874_5895_41E4_2181B518D384",
   "yaw": -157.19,
   "distance": 1,
   "backwardYaw": 9.9
  }
 ],
 "hfovMin": "135%",
 "partial": false,
 "class": "Panorama"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.4,
  "pitch": -17.85
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 5)",
    "targetYaw": 172.12,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -31.26,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D6F44967_D874_5895_41E4_2181B518D384_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 88.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -34.08,
    "path": "shortest",
    "yawSpeed": 58.17,
    "pitchSpeed": 29.45,
    "targetPitch": -22.08,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 8)",
    "targetYaw": -104.3,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -21.32,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D4DF3213_D925_93E3_41EA_838D04B7D969",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.61,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -92.59,
    "path": "shortest",
    "yawSpeed": 32.47,
    "pitchSpeed": 16.66,
    "targetPitch": -18.26,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 4)",
    "targetYaw": -178.97,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -6.94,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D7EC9349_D925_906C_41E3_FCD6B4E9BEEB",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -34.08,
  "pitch": -22.08
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 8)",
    "targetYaw": -104.3,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -21.32,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D5B6B97A_D875_D885_41D3_5968FB766908_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -69.76,
  "pitch": -2.28
 },
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D583DF16_D874_588C_41E0_713A9F538CDE_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -34.71,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -92.59,
    "path": "shortest",
    "yawSpeed": 23.47,
    "pitchSpeed": 12.18,
    "targetPitch": -18.26,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 4)",
    "targetYaw": -178.97,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -6.94,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D633B1AF_D925_9022_41E9_450D276304B2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.79,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 86.88,
    "path": "shortest",
    "yawSpeed": 32.54,
    "pitchSpeed": 16.69,
    "targetPitch": -15.05,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 3)",
    "targetYaw": -6.34,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -15.5,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D6D984C8_D925_906C_41E9_528C302FA418",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -134.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 109.63,
    "path": "shortest",
    "yawSpeed": 116.25,
    "pitchSpeed": 58.36,
    "targetPitch": -25.48,
    "easing": "cubic_in_out"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "end": "this.mainPlayList.set('selectedIndex', 2)",
    "targetYaw": 41.27,
    "path": "shortest",
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "targetPitch": -17.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_D695945F_D925_9064_41EB_00E2A4BEB665",
 "automaticZoomSpeed": 10
},
{
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": "8px",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "minHeight": 50,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipPaddingBottom": 4,
 "transitionMode": "blending",
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarRight": 0,
 "progressBarBorderSize": 6,
 "transitionDuration": 500,
 "paddingLeft": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "paddingBottom": 0,
 "minWidth": 100,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionColor": "#FF6600",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipShadowVerticalLength": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 8,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "class": "ViewerArea",
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "paddingTop": 0,
 "progressBarBorderColor": "#0066FF",
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ]
},
{
 "class": "Container",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "width": 115.05,
 "right": "0%",
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "top": "0%",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "left",
 "height": 641,
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "top",
 "layout": "absolute",
 "data": {
  "name": "--SETTINGS"
 },
 "shadow": false
},
{
 "class": "Container",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 30,
 "width": 573,
 "children": [
  "this.Image_D61B8FF2_D85B_D799_41E1_D5F6A1F12271"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "top": 15,
 "creationPolicy": "inAdvance",
 "horizontalAlign": "left",
 "height": 133,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "minWidth": 1,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "top",
 "layout": "absolute",
 "data": {
  "name": "--STICKER"
 },
 "shadow": false
},
{
 "class": "Container",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "right": "0%",
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "minHeight": 1,
 "bottom": 0,
 "creationPolicy": "inAdvance",
 "height": 118,
 "paddingLeft": 0,
 "horizontalAlign": "left",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "minWidth": 1,
 "overflow": "visible",
 "backgroundOpacity": 0.64,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "top",
 "layout": "absolute",
 "data": {
  "name": "--MENU"
 },
 "shadow": false
},
{
 "class": "Container",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "propagateClick": true,
 "right": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "top": "0%",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "top",
 "layout": "absolute",
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "shadow": false
},
{
 "class": "IconButton",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "maxHeight": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "mode": "toggle",
 "horizontalAlign": "center",
 "height": 58,
 "paddingLeft": 0,
 "transparencyActive": true,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "shadow": false
},
{
 "class": "IconButton",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "maxHeight": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "mode": "toggle",
 "horizontalAlign": "center",
 "height": 58,
 "paddingLeft": 0,
 "transparencyActive": true,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "data": {
  "name": "IconButton MUTE"
 },
 "shadow": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -74.31,
   "hfov": 12.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -28.27
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7, this.camera_D7216FF2_D926_703D_41D0_39A4AEBF359C); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0D3EAB_D875_B60C_41C4_C41A516685D6",
   "pitch": -28.27,
   "yaw": -74.31,
   "hfov": 12.74,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CDB8087D_D8FC_B9DB_41D1_0D5427F11764",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 104.83,
   "hfov": 12.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.34
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048, this.camera_D731A014_D926_6FE5_41DD_47F5185C9BD0); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0D8EAB_D875_B60C_4197_3A2826AF8234",
   "pitch": -32.34,
   "yaw": 104.83,
   "hfov": 12.22,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CD2C6DE1_D8FD_DAEC_41E9_84CF95832E54",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 45.04,
   "hfov": 13.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -21.79
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4, this.camera_D7000031_D925_903F_41E2_A85A63AFB334); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0DDEAB_D875_B60C_41E6_3B40A6023E59",
   "pitch": -21.79,
   "yaw": 45.04,
   "hfov": 13.43,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CD57AB9F_D8F4_5F52_41D1_9D08FE722749",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.85,
   "hfov": 12.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.35
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545, this.camera_D768604F_D925_9063_41EA_74EA1902F876); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0C2EAE_D875_B607_41C9_DE9B723C1F4C",
   "pitch": -33.35,
   "yaw": -35.85,
   "hfov": 12.08,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CD7475C0_D8F5_EB2F_41E7_39BD80CC891F",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 123,
   "hfov": 10.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.39
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE, this.camera_D67D33D8_D925_906D_41E3_82846D7089B4); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE00AEB9_D875_B60C_41E1_0EA4068D49A5",
   "pitch": -4.39,
   "yaw": 123,
   "hfov": 10.68,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FB4591E9_D84D_EA2C_41AD_954CB005F6D6",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.74,
   "hfov": 10.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.34
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D, this.camera_D75BC2F0_D925_903D_41E3_82D9683C7DE2); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE07DEB3_D875_B61C_41DB_FE217F832B18",
   "pitch": -10.34,
   "yaw": 81.74,
   "hfov": 10.54,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C41956FF_D834_5678_4199_8CCD4BAAE15C",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 124.93,
   "hfov": 11.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -34.29
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3, this.camera_D7A3E0AA_D925_902D_41B6_9EE947FE9B4A); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE032EB7_D875_B605_41C1_4BBA61178570",
   "pitch": -34.29,
   "yaw": 124.93,
   "hfov": 11.95,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F80F7E19_D85F_D9C7_41EA_A1F29AF89E4D",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.54,
   "hfov": 13.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.26
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB, this.camera_D78750EA_D925_902D_4195_E94607D33575); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE038EB7_D875_B605_41B7_B3D72D9FFD62",
   "pitch": -20.26,
   "yaw": 127.54,
   "hfov": 13.57,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F9F4F55D_D85C_EA79_41E6_EE91253726AD",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.37,
   "hfov": 10.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.38
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB, this.camera_D7B410C8_D925_906F_41EB_016A42147493); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE03EEB7_D875_B605_41E3_105F1CAEACC2",
   "pitch": -11.38,
   "yaw": -159.37,
   "hfov": 10.5,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F981F5B7_D85C_EA37_41D9_A7D1F35895DC",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.83,
   "hfov": 12.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.74
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF, this.camera_D74CE06C_D925_9025_41E3_70438D74FDBF); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "click to navigate around",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0E3EA9_D875_B60F_41B6_B93E61DFDE46",
   "pitch": -31.74,
   "yaw": -175.83,
   "hfov": 12.3,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CB30CE54_D8D4_593E_41E5_146CDE358B17",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -114.51,
   "hfov": 9.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.96
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Storage ",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0E8EAB_D875_B60C_41E3_EC9931696F35",
   "pitch": -1.96,
   "yaw": -114.51,
   "hfov": 9.1,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CC97A0D0_D8CC_A93E_4152_3238803BD150",
 "data": {
  "label": "Info Red 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 84.21,
   "hfov": 6.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 21,
      "height": 16
     }
    ]
   },
   "pitch": -3.26
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D, this.camera_D750808A_D925_90ED_4170_F331E30DFC96); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0EEEAB_D875_B60C_41B7_3E6F77BEA6F8",
   "pitch": -3.26,
   "yaw": 84.21,
   "hfov": 6.42,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CC1E6672_D8F4_A9E4_41C7_1568057F0BA4",
 "data": {
  "label": "Arrow 05a"
 }
},
{
 "class": "IconButton",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "maxHeight": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "mode": "toggle",
 "horizontalAlign": "center",
 "height": 58,
 "paddingLeft": 0,
 "transparencyActive": true,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "data": {
  "name": "IconButton HS "
 },
 "shadow": false
},
{
 "class": "IconButton",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "maxHeight": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "mode": "push",
 "horizontalAlign": "center",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingLeft": 0,
 "transparencyActive": true,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "visible": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false
},
{
 "class": "IconButton",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "width": 100,
 "maxHeight": 37,
 "maxWidth": 49,
 "right": 30,
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "bottom": 8,
 "mode": "push",
 "horizontalAlign": "center",
 "height": 75,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "paddingLeft": 0,
 "transparencyActive": true,
 "minWidth": 1,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false
},
{
 "class": "IconButton",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "maxHeight": 58,
 "maxWidth": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "mode": "toggle",
 "horizontalAlign": "center",
 "height": 58,
 "paddingLeft": 0,
 "transparencyActive": true,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "data": {
  "name": "IconButton GYRO"
 },
 "shadow": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.89,
   "hfov": 12.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.83
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D, this.camera_D7087289_D925_90EF_41C4_341DD1838C3C); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE05CEB4_D875_B61B_41E4_714F6E672CAA",
   "pitch": -26.83,
   "yaw": 134.89,
   "hfov": 12.91,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C71E92C8_D84F_AEB1_41B7_94324FE0B3BA",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90.19,
   "hfov": 10.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -15.65
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB, this.camera_D71D4299_D925_90EF_41C2_9E3CD7E38F17); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE043EB4_D875_B61B_41E7_E7A9503972B2",
   "pitch": -15.65,
   "yaw": -90.19,
   "hfov": 10.32,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C66F620C_D84D_E9B3_41D5_79D87EBA5AA6",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.64,
   "hfov": 10.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -15.65
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE, this.camera_D732527C_D925_9024_41EA_4B18286AEA41); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE048EB4_D875_B61B_41D6_25051791F26A",
   "pitch": -15.65,
   "yaw": -8.64,
   "hfov": 10.32,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C743F8EA_D84C_7A74_41EA_3F94B9844382",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 115.39,
   "hfov": 12.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.14
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B702CF_D874_A99B_41E2_48A942F166CB, this.camera_D66D63CB_D925_906C_4190_3CBAEE79C149); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE021EB7_D875_B605_41D4_A1D20B6A9CA3",
   "pitch": -32.14,
   "yaw": 115.39,
   "hfov": 12.25,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F8DEEB6F_D854_7E42_41E2_A881C06511D7",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.35,
   "hfov": 12.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.43
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E, this.camera_D61AF3BB_D925_902C_41E8_4BFF7F1838C8); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE025EB7_D875_B605_41E7_31561CB25B19",
   "pitch": -33.43,
   "yaw": -85.35,
   "hfov": 12.07,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F8A98025_D85C_A9C3_41E2_81DDE9F4143D",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.6,
   "hfov": 11.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -35.84
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB, this.camera_D637339F_D925_90E3_41DE_880561E33BD8); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE090EB1_D875_B61C_41D0_C40F441F9B9F",
   "pitch": -35.84,
   "yaw": -84.6,
   "hfov": 11.72,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C4874B1D_D8D4_BF69_41E1_BF13D47EE82B",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 24.24,
   "hfov": 12.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.54
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE095EB1_D875_B61C_41DA_5E20FB1FEB3B",
   "pitch": -30.54,
   "yaw": 24.24,
   "hfov": 12.46,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C3A492AB_D8D4_6EB9_41E1_77C1268F66F8",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.36,
   "hfov": 12.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -27.21
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D, this.camera_D6513404_D925_97E5_41E6_44B57B294C0D); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE064EB3_D875_B61C_41D6_C103E6DBEA92",
   "pitch": -27.21,
   "yaw": 89.36,
   "hfov": 12.86,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C472FBDE_D837_DEB6_41B6_BA9609048C15",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.65,
   "hfov": 11.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -35.38
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF, this.camera_D64D83E9_D925_902C_41E6_0FD1C64AC191); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE069EB4_D875_B61B_41D3_2EA2A25957A4",
   "pitch": -35.38,
   "yaw": -111.65,
   "hfov": 11.79,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C46BBA50_D835_D98C_41AB_B9B911D47859",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -155.01,
   "hfov": 13.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -21.92
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048, this.camera_D6B3742D_D925_9024_41EB_0B116A1F8ADD); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE06DEB4_D875_B61B_41C0_7B928ED7FCD1",
   "pitch": -21.92,
   "yaw": -155.01,
   "hfov": 13.42,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C5140703_D834_B792_41E1_75F4A87F6B1F",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.79,
   "hfov": 9.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -48
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB, this.camera_D7CF9364_D925_9025_41EA_C302C01C3967); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE010EB9_D875_B60D_41D7_A53791BECA0C",
   "pitch": -48,
   "yaw": -169.79,
   "hfov": 9.68,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FAD06EC9_D857_B650_41EA_19056EF5DFF9",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 66.87,
   "hfov": 10.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -42.87
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D592EC98_D87C_59BB_41E7_756107042EB7, this.camera_D7985108_D925_91ED_41B5_56F87412C774); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE052EB4_D875_B61B_41E0_0AA1650B6D6F",
   "pitch": -42.87,
   "yaw": 66.87,
   "hfov": 10.6,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C68AF0BA_D834_EAE2_41C7_A0B1D09957B9",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.27,
   "hfov": 13.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -24.88
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB, this.camera_D7FD6148_D925_906C_41DE_4A082D842455); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE058EB4_D875_B61B_41E2_B73A7DB2E051",
   "pitch": -24.88,
   "yaw": 29.27,
   "hfov": 13.12,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C543EF9F_D835_F6D7_41D6_13F682D819FC",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.9,
   "hfov": 12.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.03
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4, this.camera_D7CE7168_D925_902D_41E7_3A01D1322C50); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0A9EAE_D875_B604_41DA_D0909F67C15F",
   "pitch": -31.03,
   "yaw": 9.9,
   "hfov": 12.39,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C0C8007D_D8D4_E9D1_41D9_4E18C8459D4D",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.73,
   "hfov": 9.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -46.61
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB, this.camera_D7D02193_D925_90E3_41E1_FC543B18E4CF); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0AEEAE_D875_B604_41BF_9BBA283E3CC2",
   "pitch": -46.61,
   "yaw": -160.73,
   "hfov": 9.94,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C188BB12_D8DD_BF51_41E9_97169BF71D04",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.37,
   "hfov": 12.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.3
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE094EAE_D875_B604_41D6_818CD3DCEE59",
   "pitch": -26.3,
   "yaw": 74.37,
   "hfov": 12.97,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C1BCF827_D8DC_B97D_41B7_75D020924977",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 142.49,
   "hfov": 13.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -23.62
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE099EAE_D875_B604_41CC_26A0D133CEC5",
   "pitch": -23.62,
   "yaw": 142.49,
   "hfov": 13.25,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C1DD8B3D_D8DC_DF4C_41E1_AF74A3A96082",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -40.73,
   "hfov": 10.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -41.76
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908, this.camera_D4DF3213_D925_93E3_41EA_838D04B7D969); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE08FEB1_D875_B61C_41A9_8232E97E492E",
   "pitch": -41.76,
   "yaw": -40.73,
   "hfov": 10.79,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C33C0A93_D8CC_DE80_41C8_8BEBD44A857E",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -115.99,
   "hfov": 10.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -14.25
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A, this.camera_D4D62233_D925_903C_41E9_08DEEEB4B097); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE073EB1_D875_B61C_41BE_3A080C215BBD",
   "pitch": -14.25,
   "yaw": -115.99,
   "hfov": 10.38,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C3C066E7_D8CC_568D_41D9_A8CBA5F26328",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 59.38,
   "hfov": 12.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -28.75
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545, this.camera_D4D04240_D925_905D_41A6_B5BAD9589FA7); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE079EB3_D875_B61C_41B7_9C813DC9B157",
   "pitch": -28.75,
   "yaw": 59.38,
   "hfov": 12.68,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C4AFB325_D834_AF8F_41E3_2AC53B1ED34F",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.21,
   "hfov": 13.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -24.44
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4, this.camera_D7EC9349_D925_906C_41E3_FCD6B4E9BEEB); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0C7EAE_D875_B607_41E7_084E82FA9647",
   "pitch": -24.44,
   "yaw": -3.21,
   "hfov": 13.17,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CE862609_D8F5_E93A_41D2_0FC3740452F6",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.75,
   "hfov": 12.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.3
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF, this.camera_D7A3430E_D925_91E4_41E9_D38A352BF2D1); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0CCEAE_D875_B604_41E7_325C310704E6",
   "pitch": -26.3,
   "yaw": -88.75,
   "hfov": 12.97,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CFB43053_D8CD_E92A_41B8_D3BAA87B7CF6",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -64.51,
   "hfov": 13.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -21.9
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5831EEC_D874_599D_41C8_A190F61CD545, this.camera_D788632B_D925_9023_41D3_EB5262AD3FD9); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0B1EAE_D875_B604_41D4_6EDCFDC1FAB6",
   "pitch": -21.9,
   "yaw": -64.51,
   "hfov": 13.42,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CFED9335_D8CD_EF69_41E3_634C440DC39C",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -9.91,
   "hfov": 10.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -19.33
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D, this.camera_C9100542_D925_905D_4192_F555EE31993F); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE016EB9_D875_B60C_41D6_6323C52C4542",
   "pitch": -19.33,
   "yaw": -9.91,
   "hfov": 10.11,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FA5E9ACD_D854_5E6C_41E3_530F214FD7F4",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -75.65,
   "hfov": 12.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.44
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8, this.camera_C91ED527_D925_9023_41C8_8F618979A816); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE01DEB9_D875_B60C_41B1_662067C42D25",
   "pitch": -26.44,
   "yaw": -75.65,
   "hfov": 12.95,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FBFE1908_D84C_DBD6_41D5_CD52179F9CB1",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.19,
   "hfov": 13.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -21.66
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB, this.camera_C960A552_D925_907D_41EB_079158E17D7D); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_CF7D2D0C_D909_5499_41D7_11CF8BD884E8",
   "pitch": -21.66,
   "yaw": 159.19,
   "hfov": 13.44,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C9B58D03_D906_D46C_41E6_4AC6B10F5F03",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 48.68,
   "hfov": 10.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -12.1
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB, this.camera_D624F38F_D925_90E3_41D4_C62F7CE48609); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE030EB6_D875_B607_41EA_35F18BADD106",
   "pitch": -12.1,
   "yaw": 48.68,
   "hfov": 10.48,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C62E4D92_D854_BADB_41E7_87A958945046",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.27,
   "hfov": 10.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -41.87
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3, this.camera_D7C21374_D925_9024_41BD_D7B5A5CCF460); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE034EB6_D875_B607_41D9_4F21CB4A902B",
   "pitch": -41.87,
   "yaw": -160.27,
   "hfov": 10.77,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C756B2F3_D854_AE5F_41C2_59706A58E52C",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.76,
   "hfov": 13.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -23.48
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E, this.camera_D7D31382_D925_90DC_41E3_2E571EE15F2D); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE03AEB7_D875_B605_41D8_7DFCD8118681",
   "pitch": -23.48,
   "yaw": -169.76,
   "hfov": 13.27,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C76EF33C_D854_AFC4_41D6_B6495978FC04",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.14,
   "hfov": 10.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.35
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E, this.camera_D723725E_D925_9065_41CD_4F7E01B6D3B5); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE024EB9_D875_B60D_41E3_FECADB531225",
   "pitch": -4.35,
   "yaw": -117.14,
   "hfov": 10.68,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F997B8A2_D854_7ACE_41CE_336879770B2E",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.52,
   "hfov": 10.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -41.22
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7, this.camera_D73B326C_D925_9024_41E8_58AC7F77B7BC); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE02AEB9_D875_B60D_41E9_9F0A89A3FF1F",
   "pitch": -41.22,
   "yaw": 1.52,
   "hfov": 10.88,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FACFB602_D855_E9CD_41E8_49946F61A9BB",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.69,
   "hfov": 11.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.73
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB, this.camera_D712E2A7_D925_9024_41DC_DE36D6AE22FD); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0A5EB1_D875_B61D_41CE_31EBC36739A6",
   "pitch": -38.73,
   "yaw": -81.69,
   "hfov": 11.28,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C11E45F8_D8DC_6AD6_41B4_417DB1E53B33",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -168.04,
   "hfov": 9.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -47.64
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D6F44967_D874_5895_41E4_2181B518D384, this.camera_D77E42C5_D925_9064_41E5_64FD538980C7); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0ABEB1_D875_B61C_41E9_E2054A6A84BF",
   "pitch": -47.64,
   "yaw": -168.04,
   "hfov": 9.75,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C1564BBB_D8D4_DF4A_41CB_51A8F1C8B493",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 111.01,
   "hfov": 13.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D583DF16_D874_588C_41E0_713A9F538CDE, this.camera_D74682E0_D925_905D_41DD_F7C73A6DE229); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE004EB9_D875_B60C_418B_923BA72C90C2",
   "pitch": -25.81,
   "yaw": 111.01,
   "hfov": 13.02,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FB8BC18F_D84F_EAE6_41D5_3427FDB63F16",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -9.16,
   "hfov": 12.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.74
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE09AEB1_D875_B61C_41E1_A4901098F790",
   "pitch": -30.74,
   "yaw": -9.16,
   "hfov": 12.43,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C432A921_D8D5_DBB1_41EA_FB90DC5AD202",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.46,
   "hfov": 12.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.82
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4, this.camera_D633B1AF_D925_9022_41E9_450D276304B2); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE080EB1_D875_B61C_41E7_53F21B52ADF6",
   "pitch": -32.82,
   "yaw": 113.46,
   "hfov": 12.15,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C478228E_D8D4_A971_419E_3553B85B3E4D",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -103.96,
   "hfov": 9.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.42
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Storage",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE085EB1_D875_B61C_41C6_37FCC667C30D",
   "pitch": -2.42,
   "yaw": -103.96,
   "hfov": 9.1,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C3FC6ECF_D8CC_7686_41B1_1D23555CE161",
 "data": {
  "label": "Info Red 02"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -91.57,
   "hfov": 11.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -39.58
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D582F5D5_D875_EB8F_41E0_6029707E143D, this.camera_D615C1CD_D925_9067_41E8_8727DF4428CF); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE088EB1_D875_B61C_41E6_9CAF3BF6576F",
   "pitch": -39.58,
   "yaw": -91.57,
   "hfov": 11.15,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C38CBF36_D8CC_7784_41E7_2253A739BDD1",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 51.81,
   "hfov": 13.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.69
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF, this.camera_D695945F_D925_9064_41EB_00E2A4BEB665); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0B6EAE_D875_B604_41E5_DE821449A136",
   "pitch": -20.69,
   "yaw": 51.81,
   "hfov": 13.53,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CF847044_D8CC_6929_41E5_A159B40AF9AB",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.39,
   "hfov": 13.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -25.09
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D59246B3_D87B_E98D_41E1_6FAB29497048, this.camera_D6D984C8_D925_906C_41E9_528C302FA418); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0BBEAE_D875_B604_41E7_7971B87B2DB2",
   "pitch": -25.09,
   "yaw": 4.39,
   "hfov": 13.1,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CF1B0E41_D8D4_592B_41E2_2E2EB93F86DE",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 145.29,
   "hfov": 12.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.3
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D5B6B97A_D875_D885_41D3_5968FB766908, this.camera_D6F84494_D925_90E4_41DF_30B2EFC6D03D); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0A0EAE_D875_B604_41D9_E7C8A34B482C",
   "pitch": -33.3,
   "yaw": 145.29,
   "hfov": 12.09,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C0F6AA49_D8D4_593D_41D0_1DE997EAA8BC",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.19,
   "hfov": 12.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -27.82
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D6F44967_D874_5895_41E4_2181B518D384, this.camera_C93D24FA_D925_902C_41DA_E5C810AE725F); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "distance": 100,
   "image": "this.AnimatedImageResource_FE0A5EAE_D875_B604_41DA_D78F0F6DC904",
   "pitch": -27.82,
   "yaw": -157.19,
   "hfov": 12.79,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C00B5C0B_D8D4_F933_41CF_754347038599",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "Container",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "width": 110,
 "right": "0%",
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "top": "0%",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "center",
 "height": 110,
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "data": {
  "name": "button menu sup"
 },
 "shadow": false
},
{
 "class": "Container",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "right": "0%",
 "width": "91.304%",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "height": "85.959%",
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "gap": 3,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "top",
 "layout": "vertical",
 "visible": false,
 "data": {
  "name": "-button set"
 },
 "shadow": false
},
{
 "class": "Image",
 "propagateClick": false,
 "paddingTop": 0,
 "id": "Image_D61B8FF2_D85B_D799_41E1_D5F6A1F12271",
 "left": "0%",
 "maxHeight": 774,
 "maxWidth": 1549,
 "width": "24.782%",
 "url": "skin/Image_D61B8FF2_D85B_D799_41E1_D5F6A1F12271.png",
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "top": "0%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "height": "36.09%",
 "paddingBottom": 0,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "data": {
  "name": "LS Logo"
 },
 "shadow": false
},
{
 "class": "Image",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "maxHeight": 2,
 "maxWidth": 3000,
 "right": "0%",
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "bottom": 53,
 "horizontalAlign": "center",
 "height": 2,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "data": {
  "name": "white line"
 },
 "shadow": false
},
{
 "class": "Container",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "width": 1199,
 "children": [
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "left",
 "height": 51,
 "paddingLeft": 30,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "gap": 3,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "data": {
  "name": "-button set container"
 },
 "shadow": false
},
{
 "class": "Container",
 "backgroundColorRatios": [
  0,
  1
 ],
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "scrollBarMargin": 2,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "propagateClick": false,
 "shadowColor": "#000000",
 "shadowVerticalLength": 0,
 "right": "15%",
 "contentOpaque": false,
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "borderSize": 0,
 "minHeight": 1,
 "top": "7%",
 "bottom": "7%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "minWidth": 1,
 "shadowBlurRadius": 25,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "shadowOpacity": 0.3,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "verticalAlign": "top",
 "layout": "vertical",
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "paddingTop": 0
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0D3EAB_D875_B60C_41C4_C41A516685D6",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0D8EAB_D875_B60C_4197_3A2826AF8234",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0DDEAB_D875_B60C_41E6_3B40A6023E59",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D58D7910_D87B_B88A_41E4_AADFAB1DB1DF_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0C2EAE_D875_B607_41C9_DE9B723C1F4C",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D6BFEF6E_D87B_F89C_41DF_9BAE99031D5D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE00AEB9_D875_B60C_41E1_0EA4068D49A5",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B7130C_D875_A89F_41E5_A7BE11BF478A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE07DEB3_D875_B61C_41DB_FE217F832B18",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE032EB7_D875_B605_41C1_4BBA61178570",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE038EB7_D875_B605_41B7_B3D72D9FFD62",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B67B8B_D874_DF9B_41DE_F19FAA43C39E_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE03EEB7_D875_B605_41E3_105F1CAEACC2",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0E3EA9_D875_B60F_41B6_B93E61DFDE46",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 680,
   "height": 1020
  }
 ],
 "id": "AnimatedImageResource_FE0E8EAB_D875_B60C_41E3_EC9931696F35",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D592EC98_D87C_59BB_41E7_756107042EB7_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 540
  }
 ],
 "id": "AnimatedImageResource_FE0EEEAB_D875_B60C_41B7_3E6F77BEA6F8",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE05CEB4_D875_B61B_41E4_714F6E672CAA",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE043EB4_D875_B61B_41E7_E7A9503972B2",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D583160F_D874_A89B_41DD_D69A21ADDFBB_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE048EB4_D875_B61B_41D6_25051791F26A",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE021EB7_D875_B605_41D4_A1D20B6A9CA3",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5833F0F_D874_F89C_41BA_7F8AF8F93CC3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE025EB7_D875_B605_41E7_31561CB25B19",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE090EB1_D875_B61C_41D0_C40F441F9B9F",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D6AECAD1_D87C_5988_41E4_11C96E6C43CB_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE095EB1_D875_B61C_41DA_5E20FB1FEB3B",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE064EB3_D875_B61C_41D6_C103E6DBEA92",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE069EB4_D875_B61B_41D3_2EA2A25957A4",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5831EEC_D874_599D_41C8_A190F61CD545_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE06DEB4_D875_B61B_41C0_7B928ED7FCD1",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B6D279_D874_6884_41C6_AC564CE2A7F7_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE010EB9_D875_B60D_41D7_A53791BECA0C",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE052EB4_D875_B61B_41E0_0AA1650B6D6F",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B75A7A_D874_7885_41E3_8F09FC08A74D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE058EB4_D875_B61B_41E2_B73A7DB2E051",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0A9EAE_D875_B604_41DA_D0909F67C15F",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0AEEAE_D875_B604_41BF_9BBA283E3CC2",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE094EAE_D875_B604_41D6_818CD3DCEE59",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D6F44967_D874_5895_41E4_2181B518D384_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE099EAE_D875_B604_41CC_26A0D133CEC5",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE08FEB1_D875_B61C_41A9_8232E97E492E",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE073EB1_D875_B61C_41BE_3A080C215BBD",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D582F5D5_D875_EB8F_41E0_6029707E143D_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE079EB3_D875_B61C_41B7_9C813DC9B157",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0C7EAE_D875_B607_41E7_084E82FA9647",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0CCEAE_D875_B604_41E7_325C310704E6",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D59246B3_D87B_E98D_41E1_6FAB29497048_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0B1EAE_D875_B604_41D4_6EDCFDC1FAB6",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE016EB9_D875_B60C_41D6_6323C52C4542",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE01DEB9_D875_B60C_41B1_662067C42D25",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D583DF16_D874_588C_41E0_713A9F538CDE_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_CF7D2D0C_D909_5499_41D7_11CF8BD884E8",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE030EB6_D875_B607_41EA_35F18BADD106",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE034EB6_D875_B607_41D9_4F21CB4A902B",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B702CF_D874_A99B_41E2_48A942F166CB_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE03AEB7_D875_B605_41D8_7DFCD8118681",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "id": "AnimatedImageResource_FE024EB9_D875_B60D_41E3_FECADB531225",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D58336DA_D874_A984_41E1_E8564FA9F6BB_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE02AEB9_D875_B60D_41E9_9F0A89A3FF1F",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0A5EB1_D875_B61D_41CE_31EBC36739A6",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D647B5DC_D87C_ABBC_41E9_ED61F79B6FFB_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0ABEB1_D875_B61C_41E9_E2054A6A84BF",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5A8DBE2_D87B_BF84_41C8_AE5DA6A161B8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE004EB9_D875_B60C_418B_923BA72C90C2",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE09AEB1_D875_B61C_41E1_A4901098F790",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE080EB1_D875_B61C_41E7_53F21B52ADF6",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 680,
   "height": 1020
  }
 ],
 "id": "AnimatedImageResource_FE085EB1_D875_B61C_41C6_37FCC667C30D",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5B6B97A_D875_D885_41D3_5968FB766908_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE088EB1_D875_B61C_41E6_9CAF3BF6576F",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0B6EAE_D875_B604_41E5_DE821449A136",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0BBEAE_D875_B604_41E7_7971B87B2DB2",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0A0EAE_D875_B604_41D9_E7C8A34B482C",
 "colCount": 4,
 "frameDuration": 41
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D5814493_D87B_E98E_41D7_5E94E287A3B4_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "id": "AnimatedImageResource_FE0A5EAE_D875_B604_41DA_D78F0F6DC904",
 "colCount": 4,
 "frameDuration": 41
},
{
 "class": "IconButton",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "maxHeight": 60,
 "maxWidth": 60,
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 1,
 "mode": "toggle",
 "horizontalAlign": "center",
 "height": 60,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingLeft": 0,
 "transparencyActive": true,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "data": {
  "name": "image button menu"
 },
 "shadow": false
},
{
 "textDecoration": "none",
 "class": "Button",
 "fontFamily": "Montserrat",
 "propagateClick": true,
 "paddingTop": 0,
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorRatios": [
  0,
  1
 ],
 "width": 130,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "pressedBackgroundOpacity": 1,
 "layout": "horizontal",
 "data": {
  "name": "Button panorama list"
 },
 "iconBeforeLabel": true,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "borderColor": "#000000",
 "borderSize": 0,
 "minHeight": 1,
 "iconHeight": 32,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "mode": "push",
 "horizontalAlign": "center",
 "height": 40,
 "fontSize": 12,
 "label": "PANORAMA LIST",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "paddingBottom": 0,
 "minWidth": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0,
 "fontStyle": "normal",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "gap": 5,
 "cursor": "hand",
 "iconWidth": 32,
 "fontWeight": "bold",
 "shadow": false
},
{
 "class": "Container",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "propagateClick": false,
 "width": "100%",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "height": 140,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "verticalAlign": "top",
 "layout": "absolute",
 "data": {
  "name": "header"
 },
 "shadow": false
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemLabelHorizontalAlign": "center",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemThumbnailShadow": false,
 "itemThumbnailWidth": 220,
 "itemMaxHeight": 1000,
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemLabelFontFamily": "Montserrat",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "width": "100%",
 "itemBorderRadius": 0,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "minHeight": 1,
 "itemLabelPosition": "bottom",
 "itemHorizontalAlign": "center",
 "itemPaddingLeft": 3,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "backgroundColor": [
  "#000000"
 ],
 "itemThumbnailBorderRadius": 0,
 "paddingLeft": 70,
 "itemWidth": 220,
 "itemPaddingTop": 3,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "minWidth": 1,
 "itemBackgroundColor": [],
 "backgroundOpacity": 0.05,
 "itemOpacity": 1,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "paddingBottom": 70,
 "verticalAlign": "middle",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "scrollBarMargin": 2,
 "height": "100%",
 "propagateClick": false,
 "itemVerticalAlign": "top",
 "itemBackgroundOpacity": 0,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "shadow": false,
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#04A3E1",
 "itemLabelFontWeight": "normal",
 "selectedItemLabelFontColor": "#04A3E1",
 "itemHeight": 156,
 "itemThumbnailOpacity": 1,
 "backgroundColorDirection": "vertical",
 "itemPaddingRight": 3,
 "rollOverItemThumbnailShadow": true,
 "paddingRight": 70,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "itemLabelFontSize": 14,
 "itemLabelFontColor": "#666666",
 "itemThumbnailScaleMode": "fit_outside",
 "itemMinWidth": 50,
 "horizontalAlign": "center",
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemBackgroundColorDirection": "vertical",
 "scrollBarColor": "#04A3E1",
 "selectedItemThumbnailShadow": true,
 "scrollBarOpacity": 0.5,
 "gap": 26,
 "itemThumbnailHeight": 125,
 "itemPaddingBottom": 3,
 "borderRadius": 5,
 "scrollBarVisible": "rollOver",
 "class": "ThumbnailGrid",
 "itemMaxWidth": 1000,
 "data": {
  "name": "ThumbnailList"
 },
 "paddingTop": 10,
 "itemLabelFontStyle": "normal",
 "selectedItemLabelFontWeight": "bold",
 "itemMode": "normal",
 "itemLabelGap": 7
},
{
 "class": "HTMLText",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 100,
 "top": "0%",
 "paddingLeft": 80,
 "height": "100%",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:4.96vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.96vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "borderRadius": 0,
 "data": {
  "name": "HTMLText54192"
 },
 "shadow": false
},
{
 "class": "IconButton",
 "propagateClick": false,
 "paddingTop": 0,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxHeight": 60,
 "maxWidth": 60,
 "right": 20,
 "width": "100%",
 "paddingRight": 0,
 "borderSize": 0,
 "minHeight": 50,
 "top": 20,
 "mode": "push",
 "horizontalAlign": "right",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "paddingLeft": 0,
 "height": "36.14%",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "minWidth": 50,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "cursor": "hand",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "data": {
  "name": "IconButton X"
 },
 "shadow": false
}],
 "mobileMipmappingEnabled": false,
 "verticalAlign": "top",
 "layout": "absolute",
 "height": "100%",
 "data": {
  "name": "Player468"
 },
 "shadow": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
