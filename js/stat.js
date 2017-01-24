'use strict';

window.renderStatistics = function (ctx, names, times) {

  var startPointX = 100;
  var startPointY = 10;
  var heightWindow = 270;
  var widthWindow = 420;
  var shadowOffset = 10;

  var heightHisto = 150;
  var widthHisto = 40;
  var betweenHisto = 50;

  var fontSize = 16;
  var fontName = 'PT Mono';
  var coefLineHeight = 1.2;

  var heightLine = coefLineHeight * fontSize;
  var paddingX = startPointX + (widthWindow - (names.length * widthHisto + (names.length - 1) * betweenHisto)) / 2;
  var paddingYTop = startPointY + 1.5 * heightLine;
  var paddingYBottom = startPointY + heightWindow - 1.5 * heightLine;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(startPointX + shadowOffset, startPointY + shadowOffset, widthWindow, heightWindow);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.fillRect(startPointX, startPointY, widthWindow, heightWindow);

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.Baseline = 'hanging';
  ctx.font = fontSize + 'px' + fontName;
  ctx.fillText('Ура вы победили!', paddingX, paddingYTop);
  ctx.fillText('Список результатов:', paddingX, paddingYTop + heightLine);

  var maxResult = Math.max.apply(null, times);

  var histoSizes = times.map(function (time) {
    return Math.ceil(time / maxResult * heightHisto);
  });

  for (let i = 0; i < histoSizes.length; i++) {
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1.0)' : 'rgba(0, 0, ' + Math.ceil(Math.random() * 255) + ', 1.0)';
    ctx.fillRect(paddingX + (widthHisto + betweenHisto) * i, paddingYBottom - histoSizes[i], widthHisto, histoSizes[i]);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillText(names[i], paddingX + (widthHisto + betweenHisto) * i, paddingYBottom + heightLine);
    ctx.fillText(times[i].toFixed(0), paddingX + (widthHisto + betweenHisto) * i, paddingYBottom - histoSizes[i] - 0.5 * heightLine);
  }
};
