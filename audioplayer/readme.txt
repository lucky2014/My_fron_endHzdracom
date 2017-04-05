<!--loadeddata方法在小米4里无法取到音频的时长，可以把时间渲染放在timeupdate方法里，搜索loadeddata-->

当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时，会发生 loadeddata 事件。

当音频/视频处于加载过程中时，会依次发生以下事件：
loadstart
durationchange
loadedmetadata
loadeddata
progress
canplay
canplaythrough