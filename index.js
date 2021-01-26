//
//by anlige at www.9fn.net
//
// jQuery.qrcode plug in code ends here

// QR Code Generator
// =================
//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//	http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//	http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
const Utf8 = require('cook-code-jazor-encoding').utf8;
var $qrcode = function() {
	//---------------------------------------------------------------------
	// qrcode
	//---------------------------------------------------------------------
	/**
	 * qrcode
	 * @param typeNumber 1 to 10
	 * @param errorCorrectLevel 'L','M','Q','H'
	 */
	var qrcode = function(typeNumber, errorCorrectLevel) {
		var PAD0 = 0xEC;
		var PAD1 = 0x11;
		var _typeNumber = typeNumber;
		var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];
		var _modules = null;
		var _moduleCount = 0;
		var _dataCache = null;
		var _dataList = new Array();
		var _this = {};
		_this.useBestMaskPattern = false;
		var makeImpl = function(test, maskPattern) {
			_moduleCount = _typeNumber * 4 + 17;
			_modules = function(moduleCount) {
				var modules = new Array(moduleCount);
				for (var row = 0; row < moduleCount; row += 1) {
					modules[row] = new Array(moduleCount);
					for (var col = 0; col < moduleCount; col += 1) {
						modules[row][col] = null;
					}
				}
				return modules;
			}(_moduleCount);
			setupPositionProbePattern(0, 0);
			setupPositionProbePattern(_moduleCount - 7, 0);
			setupPositionProbePattern(0, _moduleCount - 7);
			setupPositionAdjustPattern();
			setupTimingPattern();
			setupTypeInfo(test, maskPattern);
			if (_typeNumber >= 7) {
				setupTypeNumber(test);
			}
			if (_dataCache == null) {
				_dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);
			}
			mapData(_dataCache, maskPattern);
		};
		var initArray=function(src,val){
			if(val===undefined)val=0;
			for(var i=0;i<src.length;i++)src[i]=val;
			return src;
		};
		var getAutoVersion = function(length,version){
			var numArray3;
	        var num3;
	        var num4;
	        var num7;
	        var index = 0;
	        var bits = initArray(new Array(length + 0x20));
	        bits[index] = 4;
            numArray3 = [ 
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 
                    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 
                    8, 8, 8, 8, 8, 8, 8, 8, 8
                 ];
            index++;
            bits[index] = 8;
            num3 = index;
            index++;
            for (num4 = 0; num4 < length; num4++)
            {
                bits[num4 + index] = 8;
            }
            index += length;
            
	        var num6 = 0;
	        for (num4 = 0; num4 < index; num4++)
	        {
	            num6 += bits[num4];
	        }
	        num7=_errorCorrectLevel;
	        var numArray4 = [[ 
	                0, 0x80, 0xe0, 0x160, 0x200, 0x2b0, 0x360, 0x3e0, 0x4d0, 0x5b0, 0x6c0, 0x7f0, 0x910, 0xa70, 0xb68, 0xcf8, 
	                0xe28, 0xfd8, 0x1198, 0x1398, 0x14e8, 0x1650, 0x1870, 0x1ae0, 0x1c90, 0x1f40, 0x2130, 0x2340, 0x2548, 0x2798, 0x2ae8, 0x2d78, 
	                0x3028, 0x32f8, 0x35e8, 0x38a0, 0x3bd0, 0x3e40, 0x41b0, 0x4540, 0x48f0
	             ], [
	                0, 0x98, 0x110, 440, 640, 0x360, 0x440, 0x4e0, 0x610, 0x740, 0x890, 0xa20, 0xb90, 0xd60, 0xe68, 0x1058, 
	                0x1268, 0x1438, 0x1688, 0x18d8, 0x1ae8, 0x1d20, 0x1f70, 0x2230, 0x24b0, 0x27e0, 0x2ad0, 0x2de0, 0x2fd8, 0x32f8, 0x3638, 0x3998, 
	                0x3d18, 0x40b8, 0x4478, 0x4810, 0x4c10, 0x5030, 0x5470, 0x57e0, 0x5c60
	             ], [
	                0, 0x48, 0x80, 0xd0, 0x120, 0x170, 480, 0x210, 0x2b0, 800, 0x3d0, 0x460, 0x4f0, 0x5a0, 0x628, 0x6f8, 
	                0x7e8, 0x8d8, 0x9c8, 0xaa8, 0xc08, 0xcb0, 0xdd0, 0xe80, 0x1010, 0x10d0, 0x12a0, 0x13a0, 0x14a8, 0x15e8, 0x1748, 0x18c8, 
	                0x1a68, 0x1c28, 0x1e08, 0x1ed0, 0x20f0, 0x2240, 0x23b0, 0x2630, 0x27e0
	             ], [
	                0, 0x68, 0xb0, 0x110, 0x180, 0x1f0, 0x260, 0x2c0, 880, 0x420, 0x4d0, 0x5a0, 0x670, 0x7a0, 0x828, 0x938, 
	                0xa28, 0xb78, 0xc68, 0xde8, 0xf28, 0x1000, 0x11c0, 0x1330, 0x14c0, 0x1670, 0x1790, 0x1940, 0x1b38, 0x1c78, 0x1ec8, 0x2048, 
	                0x22d8, 0x2498, 0x2678, 0x2830, 0x2a50, 0x2c90, 0x2ef0, 0x3170, 0x3410
	             ]];
	        var num8 = 0;
	        if (version == 0)
	        {
	            version = 1;
	            for (num4 = 1; num4 <= 40; num4++)
	            {
	                if (numArray4[num7][num4] >= (num6 + numArray3[version]))
	                {
	                    break;
	                }
	                version++;
	            }
	        }
	        return version;
		};
		var setupPositionProbePattern = function(row, col) {
			for (var r = -1; r <= 7; r += 1) {
				if (row + r <= -1 || _moduleCount <= row + r) continue;
				for (var c = -1; c <= 7; c += 1) {
					if (col + c <= -1 || _moduleCount <= col + c) continue;
					if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
							|| (0 <= c && c <= 6 && (r == 0 || r == 6) )
							|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
						_modules[row + r][col + c] = true;
					} else {
						_modules[row + r][col + c] = false;
					}
				}
			}
		};
		var getBestMaskPattern = function() {
			var minLostPoint = 0;
			var pattern = 0;
			for (var i = 0; i < 8; i += 1) {
				makeImpl(true, i);
				var lostPoint = QRUtil.getLostPoint(_this);
				if (i == 0 || minLostPoint > lostPoint) {
					minLostPoint = lostPoint;
					pattern = i;
				}
			}
			return pattern;
		};
		var setupTimingPattern = function() {
			for (var r = 8; r < _moduleCount - 8; r += 1) {
				if (_modules[r][6] != null) {
					continue;
				}
				_modules[r][6] = (r % 2 == 0);
			}
			for (var c = 8; c < _moduleCount - 8; c += 1) {
				if (_modules[6][c] != null) {
					continue;
				}
				_modules[6][c] = (c % 2 == 0);
			}
		};
		var setupPositionAdjustPattern = function() {
			var pos = QRUtil.getPatternPosition(_typeNumber);
			for (var i = 0; i < pos.length; i += 1) {
				for (var j = 0; j < pos.length; j += 1) {
					var row = pos[i];
					var col = pos[j];
					if (_modules[row][col] != null) {
						continue;
					}
					for (var r = -2; r <= 2; r += 1) {
						for (var c = -2; c <= 2; c += 1) {
							if (r == -2 || r == 2 || c == -2 || c == 2
									|| (r == 0 && c == 0) ) {
								_modules[row + r][col + c] = true;
							} else {
								_modules[row + r][col + c] = false;
							}
						}
					}
				}
			}
		};
		var setupTypeNumber = function(test) {
			var bits = QRUtil.getBCHTypeNumber(_typeNumber);
			for (var i = 0; i < 18; i += 1) {
				var mod = (!test && ( (bits >> i) & 1) == 1);
				_modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
			}
			for (var i = 0; i < 18; i += 1) {
				var mod = (!test && ( (bits >> i) & 1) == 1);
				_modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
			}
		};
		var setupTypeInfo = function(test, maskPattern) {
			var data = (_errorCorrectLevel << 3) | maskPattern;
			var bits = QRUtil.getBCHTypeInfo(data);
			// vertical
			for (var i = 0; i < 15; i += 1) {
				var mod = (!test && ( (bits >> i) & 1) == 1);
				if (i < 6) {
					_modules[i][8] = mod;
				} else if (i < 8) {
					_modules[i + 1][8] = mod;
				} else {
					_modules[_moduleCount - 15 + i][8] = mod;
				}
			}
			// horizontal
			for (var i = 0; i < 15; i += 1) {
				var mod = (!test && ( (bits >> i) & 1) == 1);
				if (i < 8) {
					_modules[8][_moduleCount - i - 1] = mod;
				} else if (i < 9) {
					_modules[8][15 - i - 1 + 1] = mod;
				} else {
					_modules[8][15 - i - 1] = mod;
				}
			}
			// fixed module
			_modules[_moduleCount - 8][8] = (!test);
		};
		var mapData = function(data, maskPattern) {
			var inc = -1;
			var row = _moduleCount - 1;
			var bitIndex = 7;
			var byteIndex = 0;
			var maskFunc = QRUtil.getMaskFunction(maskPattern);
			for (var col = _moduleCount - 1; col > 0; col -= 2) {
				if (col == 6) col -= 1;
				while (true) {
					for (var c = 0; c < 2; c += 1) {
						if (_modules[row][col - c] == null) {
							var dark = false;
							if (byteIndex < data.length) {
								dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
							}
							var mask = maskFunc(row, col - c);
							if (mask) {
								dark = !dark;
							}
							_modules[row][col - c] = dark;
							bitIndex -= 1;
							if (bitIndex == -1) {
								byteIndex += 1;
								bitIndex = 7;
							}
						}
					}
					row += inc;
					if (row < 0 || _moduleCount <= row) {
						row -= inc;
						inc = -inc;
						break;
					}
				}
			}
		};
		var createBytes = function(buffer, rsBlocks) {
			var offset = 0;
			var maxDcCount = 0;
			var maxEcCount = 0;
			var dcdata = new Array(rsBlocks.length);
			var ecdata = new Array(rsBlocks.length);
			for (var r = 0; r < rsBlocks.length; r += 1) {
				var dcCount = rsBlocks[r].dataCount;
				var ecCount = rsBlocks[r].totalCount - dcCount;
				maxDcCount = Math.max(maxDcCount, dcCount);
				maxEcCount = Math.max(maxEcCount, ecCount);
				dcdata[r] = new Array(dcCount);
				for (var i = 0; i < dcdata[r].length; i += 1) {
					dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
				}
				offset += dcCount;
				var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
				var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
				var modPoly = rawPoly.mod(rsPoly);
				ecdata[r] = new Array(rsPoly.getLength() - 1);
				for (var i = 0; i < ecdata[r].length; i += 1) {
					var modIndex = i + modPoly.getLength() - ecdata[r].length;
					ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
				}
			}
			var totalCodeCount = 0;
			for (var i = 0; i < rsBlocks.length; i += 1) {
				totalCodeCount += rsBlocks[i].totalCount;
			}
			var data = new Array(totalCodeCount);
			var index = 0;
			for (var i = 0; i < maxDcCount; i += 1) {
				for (var r = 0; r < rsBlocks.length; r += 1) {
					if (i < dcdata[r].length) {
						data[index] = dcdata[r][i];
						index += 1;
					}
				}
			}
			for (var i = 0; i < maxEcCount; i += 1) {
				for (var r = 0; r < rsBlocks.length; r += 1) {
					if (i < ecdata[r].length) {
						data[index] = ecdata[r][i];
						index += 1;
					}
				}
			}
			return data;
		};
		var createData = function(typeNumber, errorCorrectLevel, dataList) {
			var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
			var buffer = qrBitBuffer();
			var data = dataList;
			buffer.put(data.getMode(), 4);
			buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
			data.write(buffer);
			// calc num max data.
			var totalDataCount = 0;
			for (var i = 0; i < rsBlocks.length; i += 1) {
				totalDataCount += rsBlocks[i].dataCount;
			}
			if (buffer.getLengthInBits() > totalDataCount * 8) {
				throw new Error('code length overflow. ('
					+ buffer.getLengthInBits()
					+ '>'
					+ totalDataCount * 8
					+ ')');
			}
			// end code
			if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
				buffer.put(0, 4);
			}
			// padding
			while (buffer.getLengthInBits() % 8 != 0) {
				buffer.putBit(false);
			}
			// padding
			while (true) {
				if (buffer.getLengthInBits() >= totalDataCount * 8) {
					break;
				}
				buffer.put(PAD0, 8);
				if (buffer.getLengthInBits() >= totalDataCount * 8) {
					break;
				}
				buffer.put(PAD1, 8);
			}
			return createBytes(buffer, rsBlocks);
		};
		_this.addData = function(data) {
			var newData = qr8BitByte(data);
			if(_typeNumber==0)_typeNumber = getAutoVersion(newData.getLength(),_typeNumber);
			_dataList=newData;
			_dataCache = null;
		};
		_this.isDark = function(row, col) {
			if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
				throw new Error(row + ',' + col);
			}
			return _modules[row][col];
		};
		_this.getModuleCount = function() {
			return _moduleCount;
		};
		_this.getModule = function() {
			return _modules;
		};
		_this.getVersion = function() {
			return _typeNumber;
		};
		_this.make = function() {
			makeImpl(false, _this.useBestMaskPattern ? getBestMaskPattern() : 0 );
		};
		_this.flush = function(data, scale, margin){
			Response.ContentType="image/gif";
			F.echo(base64.toBinary(_this.getBase64(data,scale,margin)),F.TEXT.BIN);
		};
		_this.save = function(path,data, scale, margin){
			IO.file.writeAllBytes(path,base64.toBinary(_this.getBase64(data,scale,margin)));
		};
		_this.getBase64 = function(data, scale,margin){
			scale = scale || 2;
			margin = margin || 3;
			_this.addData(data);
			_this.make();
			var size = _this.getModuleCount();
			var size_ = size*scale+2*margin;
			var map=[];
			var gif = gifImage(size_, size_);
			for(var i=0;i<size_;i++){
				for(var j=0;j<size_;j++){
					if(i<margin || i>=size_-margin || j<margin || j>=size_-margin){
						gif.setPixel(i, j, 1 );
					}else{
						var x= Math.floor((i-margin) / scale),y=Math.floor((j-margin) / scale);
						gif.setPixel(i, j, (_this.isDark(y, x)? 0: 1));
					}
				}
			}
			var b = byteArrayOutputStream();
			gif.write(b);
			var gifdata = b.toByteArray();
			return base64.encode(gifdata);
		};
		return _this;
	};
	//---------------------------------------------------------------------
	// qrcode.stringToBytes
	//---------------------------------------------------------------------
	qrcode.stringToBytes = function(s) {
		return Utf8.getByteArray(s);
	};
	//---------------------------------------------------------------------
	// QRMode
	//---------------------------------------------------------------------
	var QRMode = {
		MODE_NUMBER :		1 << 0,
		MODE_ALPHA_NUM : 	1 << 1,
		MODE_8BIT_BYTE : 	1 << 2,
		MODE_KANJI :		1 << 3
	};
	//---------------------------------------------------------------------
	// QRErrorCorrectLevel
	//---------------------------------------------------------------------
	var QRErrorCorrectLevel = {
		L : 1,
		M : 0,
		Q : 3,
		H : 2
	};
	//---------------------------------------------------------------------
	// QRMaskPattern
	//---------------------------------------------------------------------
	var QRMaskPattern = {
		PATTERN000 : 0,
		PATTERN001 : 1,
		PATTERN010 : 2,
		PATTERN011 : 3,
		PATTERN100 : 4,
		PATTERN101 : 5,
		PATTERN110 : 6,
		PATTERN111 : 7
	};
	//---------------------------------------------------------------------
	// QRUtil
	//---------------------------------------------------------------------
	var QRUtil = function() {
		var PATTERN_POSITION_TABLE = [
			[],
			[6, 18],
			[6, 22],
			[6, 26],
			[6, 30],
			[6, 34],
			[6, 22, 38],
			[6, 24, 42],
			[6, 26, 46],
			[6, 28, 50],
			[6, 30, 54],
			[6, 32, 58],
			[6, 34, 62],
			[6, 26, 46, 66],
			[6, 26, 48, 70],
			[6, 26, 50, 74],
			[6, 30, 54, 78],
			[6, 30, 56, 82],
			[6, 30, 58, 86],
			[6, 34, 62, 90],
			[6, 28, 50, 72, 94],
			[6, 26, 50, 74, 98],
			[6, 30, 54, 78, 102],
			[6, 28, 54, 80, 106],
			[6, 32, 58, 84, 110],
			[6, 30, 58, 86, 114],
			[6, 34, 62, 90, 118],
			[6, 26, 50, 74, 98, 122],
			[6, 30, 54, 78, 102, 126],
			[6, 26, 52, 78, 104, 130],
			[6, 30, 56, 82, 108, 134],
			[6, 34, 60, 86, 112, 138],
			[6, 30, 58, 86, 114, 142],
			[6, 34, 62, 90, 118, 146],
			[6, 30, 54, 78, 102, 126, 150],
			[6, 24, 50, 76, 102, 128, 154],
			[6, 28, 54, 80, 106, 132, 158],
			[6, 32, 58, 84, 110, 136, 162],
			[6, 26, 54, 82, 110, 138, 166],
			[6, 30, 58, 86, 114, 142, 170]
		];
		var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
		var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
		var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
		var _this = {};
		var getBCHDigit = function(data) {
			var digit = 0;
			while (data != 0) {
				digit += 1;
				data >>>= 1;
			}
			return digit;
		};
		_this.getBCHTypeInfo = function(data) {
			var d = data << 10;
			while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
				d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
			}
			return ( (data << 10) | d) ^ G15_MASK;
		};
		_this.getBCHTypeNumber = function(data) {
			var d = data << 12;
			while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
				d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
			}
			return (data << 12) | d;
		};
		_this.getPatternPosition = function(typeNumber) {
			return PATTERN_POSITION_TABLE[typeNumber - 1];
		};
		_this.getMaskFunction = function(maskPattern) {
			switch (maskPattern) {
			case QRMaskPattern.PATTERN000 :
				return function(i, j) { return (i + j) % 2 == 0; };
			case QRMaskPattern.PATTERN001 :
				return function(i, j) { return i % 2 == 0; };
			case QRMaskPattern.PATTERN010 :
				return function(i, j) { return j % 3 == 0; };
			case QRMaskPattern.PATTERN011 :
				return function(i, j) { return (i + j) % 3 == 0; };
			case QRMaskPattern.PATTERN100 :
				return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
			case QRMaskPattern.PATTERN101 :
				return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
			case QRMaskPattern.PATTERN110 :
				return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
			case QRMaskPattern.PATTERN111 :
				return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };
			default :
				throw new Error('bad maskPattern:' + maskPattern);
			}
		};
		_this.getErrorCorrectPolynomial = function(errorCorrectLength) {
			var a = qrPolynomial([1], 0);
			for (var i = 0; i < errorCorrectLength; i += 1) {
				a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
			}
			return a;
		};
		_this.getLengthInBits = function(mode, type) {
			if (1 <= type && type < 10) {
				// 1 - 9
				switch(mode) {
				case QRMode.MODE_NUMBER 	: return 10;
				case QRMode.MODE_ALPHA_NUM 	: return 9;
				case QRMode.MODE_8BIT_BYTE	: return 8;
				case QRMode.MODE_KANJI		: return 8;
				default :
					throw new Error('mode:' + mode);
				}
			} else if (type < 27) {
				// 10 - 26
				switch(mode) {
				case QRMode.MODE_NUMBER 	: return 12;
				case QRMode.MODE_ALPHA_NUM 	: return 11;
				case QRMode.MODE_8BIT_BYTE	: return 16;
				case QRMode.MODE_KANJI		: return 10;
				default :
					throw new Error('mode:' + mode);
				}
			} else if (type < 41) {
				// 27 - 40
				switch(mode) {
				case QRMode.MODE_NUMBER 	: return 14;
				case QRMode.MODE_ALPHA_NUM	: return 13;
				case QRMode.MODE_8BIT_BYTE	: return 16;
				case QRMode.MODE_KANJI		: return 12;
				default :
					throw new Error('mode:' + mode);
				}
			} else {
				throw new Error('type:' + type);
			}
		};
		_this.getLostPoint = function(qrcode) {
			var moduleCount = qrcode.getModuleCount();
			var lostPoint = 0;
			// LEVEL1
			for (var row = 0; row < moduleCount; row += 1) {
				for (var col = 0; col < moduleCount; col += 1) {
					var sameCount = 0;
					var dark = qrcode.isDark(row, col);
					for (var r = -1; r <= 1; r += 1) {
						if (row + r < 0 || moduleCount <= row + r) {
							continue;
						}
						for (var c = -1; c <= 1; c += 1) {
							if (col + c < 0 || moduleCount <= col + c) {
								continue;
							}
							if (r == 0 && c == 0) {
								continue;
							}
							if (dark == qrcode.isDark(row + r, col + c) ) {
								sameCount += 1;
							}
						}
					}
					if (sameCount > 5) {
						lostPoint += (3 + sameCount - 5);
					}
				}
			};
			// LEVEL2
			for (var row = 0; row < moduleCount - 1; row += 1) {
				for (var col = 0; col < moduleCount - 1; col += 1) {
					var count = 0;
					if (qrcode.isDark(row, col) ) count += 1;
					if (qrcode.isDark(row + 1, col) ) count += 1;
					if (qrcode.isDark(row, col + 1) ) count += 1;
					if (qrcode.isDark(row + 1, col + 1) ) count += 1;
					if (count == 0 || count == 4) {
						lostPoint += 3;
					}
				}
			}
			// LEVEL3
			for (var row = 0; row < moduleCount; row += 1) {
				for (var col = 0; col < moduleCount - 6; col += 1) {
					if (qrcode.isDark(row, col)
							&& !qrcode.isDark(row, col + 1)
							&&  qrcode.isDark(row, col + 2)
							&&  qrcode.isDark(row, col + 3)
							&&  qrcode.isDark(row, col + 4)
							&& !qrcode.isDark(row, col + 5)
							&&  qrcode.isDark(row, col + 6) ) {
						lostPoint += 40;
					}
				}
			}
			for (var col = 0; col < moduleCount; col += 1) {
				for (var row = 0; row < moduleCount - 6; row += 1) {
					if (qrcode.isDark(row, col)
							&& !qrcode.isDark(row + 1, col)
							&&  qrcode.isDark(row + 2, col)
							&&  qrcode.isDark(row + 3, col)
							&&  qrcode.isDark(row + 4, col)
							&& !qrcode.isDark(row + 5, col)
							&&  qrcode.isDark(row + 6, col) ) {
						lostPoint += 40;
					}
				}
			}
			// LEVEL4
			var darkCount = 0;
			for (var col = 0; col < moduleCount; col += 1) {
				for (var row = 0; row < moduleCount; row += 1) {
					if (qrcode.isDark(row, col) ) {
						darkCount += 1;
					}
				}
			}
			var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
			lostPoint += ratio * 10;
			return lostPoint;
		};
		return _this;
	}();
	//---------------------------------------------------------------------
	// QRMath
	//---------------------------------------------------------------------
	var QRMath = function() {
		var EXP_TABLE = new Array(256);
		var LOG_TABLE = new Array(256);
		// initialize tables
		for (var i = 0; i < 8; i += 1) {
			EXP_TABLE[i] = 1 << i;
		}
		for (var i = 8; i < 256; i += 1) {
			EXP_TABLE[i] = EXP_TABLE[i - 4]
				^ EXP_TABLE[i - 5]
				^ EXP_TABLE[i - 6]
				^ EXP_TABLE[i - 8];
		}
		for (var i = 0; i < 255; i += 1) {
			LOG_TABLE[EXP_TABLE[i] ] = i;
		}
		var _this = {};
		_this.glog = function(n) {
			if (n < 1) {
				throw new Error('glog(' + n + ')');
			}
			return LOG_TABLE[n];
		};
		_this.gexp = function(n) {
			while (n < 0) {
				n += 255;
			}
			while (n >= 256) {
				n -= 255;
			}
			return EXP_TABLE[n];
		};
		return _this;
	}();
	//---------------------------------------------------------------------
	// qrPolynomial
	//---------------------------------------------------------------------
	function qrPolynomial(num, shift) {
		if (typeof num.length == 'undefined') {
			throw new Error(num.length + '/' + shift);
		}
		var _num = function() {
			var offset = 0;
			while (offset < num.length && num[offset] == 0) {
				offset += 1;
			}
			var _num = new Array(num.length - offset + shift);
			for (var i = 0; i < num.length - offset; i += 1) {
				_num[i] = num[i + offset];
			}
			return _num;
		}();
		var _this = {};
		_this.get = function(index) {
			return _num[index];
		};
		_this.getLength = function() {
			return _num.length;
		};
		_this.multiply = function(e) {
			var num = new Array(_this.getLength() + e.getLength() - 1);
			for (var i = 0; i < _this.getLength(); i += 1) {
				for (var j = 0; j < e.getLength(); j += 1) {
					num[i + j] ^= QRMath.gexp(QRMath.glog(_this.get(i) ) + QRMath.glog(e.get(j) ) );
				}
			}
			return qrPolynomial(num, 0);
		};
		_this.mod = function(e) {
			if (_this.getLength() - e.getLength() < 0) {
				return _this;
			}
			var ratio = QRMath.glog(_this.get(0) ) - QRMath.glog(e.get(0) );
			var num = new Array(_this.getLength() );
			for (var i = 0; i < _this.getLength(); i += 1) {
				num[i] = _this.get(i);
			}
			for (var i = 0; i < e.getLength(); i += 1) {
				num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);
			}
			// recursive call
			return qrPolynomial(num, 0).mod(e);
		};
		return _this;
	};
	//---------------------------------------------------------------------
	// QRRSBlock
	//---------------------------------------------------------------------
	var QRRSBlock = function() {
		var RS_BLOCK_TABLE = [
			// L
			// M
			// Q
			// H
			// 1
			[1, 26, 19],
			[1, 26, 16],
			[1, 26, 13],
			[1, 26, 9],
			// 2
			[1, 44, 34],
			[1, 44, 28],
			[1, 44, 22],
			[1, 44, 16],
			// 3
			[1, 70, 55],
			[1, 70, 44],
			[2, 35, 17],
			[2, 35, 13],
			// 4
			[1, 100, 80],
			[2, 50, 32],
			[2, 50, 24],
			[4, 25, 9],
			// 5
			[1, 134, 108],
			[2, 67, 43],
			[2, 33, 15, 2, 34, 16],
			[2, 33, 11, 2, 34, 12],
			// 6
			[2, 86, 68],
			[4, 43, 27],
			[4, 43, 19],
			[4, 43, 15],
			// 7
			[2, 98, 78],
			[4, 49, 31],
			[2, 32, 14, 4, 33, 15],
			[4, 39, 13, 1, 40, 14],
			// 8
			[2, 121, 97],
			[2, 60, 38, 2, 61, 39],
			[4, 40, 18, 2, 41, 19],
			[4, 40, 14, 2, 41, 15],
			// 9
			[2, 146, 116],
			[3, 58, 36, 2, 59, 37],
			[4, 36, 16, 4, 37, 17],
			[4, 36, 12, 4, 37, 13],
			// 10
			[2, 86, 68, 2, 87, 69],
			[4, 69, 43, 1, 70, 44],
			[6, 43, 19, 2, 44, 20],
			[6, 43, 15, 2, 44, 16],
			// 11
			[4, 101, 81],
			[1, 80, 50, 4, 81, 51],
			[4, 50, 22, 4, 51, 23],
			[3, 36, 12, 8, 37, 13],
			// 12
			[2, 116, 92, 2, 117, 93],
			[6, 58, 36, 2, 59, 37],
			[4, 46, 20, 6, 47, 21],
			[7, 42, 14, 4, 43, 15],
			// 13
			[4, 133, 107],
			[8, 59, 37, 1, 60, 38],
			[8, 44, 20, 4, 45, 21],
			[12, 33, 11, 4, 34, 12],
			// 14
			[3, 145, 115, 1, 146, 116],
			[4, 64, 40, 5, 65, 41],
			[11, 36, 16, 5, 37, 17],
			[11, 36, 12, 5, 37, 13],
			// 15
			[5, 109, 87, 1, 110, 88],
			[5, 65, 41, 5, 66, 42],
			[5, 54, 24, 7, 55, 25],
			[11, 36, 12],
			// 16
			[5, 122, 98, 1, 123, 99],
			[7, 73, 45, 3, 74, 46],
			[15, 43, 19, 2, 44, 20],
			[3, 45, 15, 13, 46, 16],
			// 17
			[1, 135, 107, 5, 136, 108],
			[10, 74, 46, 1, 75, 47],
			[1, 50, 22, 15, 51, 23],
			[2, 42, 14, 17, 43, 15],
			// 18
			[5, 150, 120, 1, 151, 121],
			[9, 69, 43, 4, 70, 44],
			[17, 50, 22, 1, 51, 23],
			[2, 42, 14, 19, 43, 15],
			// 19
			[3, 141, 113, 4, 142, 114],
			[3, 70, 44, 11, 71, 45],
			[17, 47, 21, 4, 48, 22],
			[9, 39, 13, 16, 40, 14],
			// 20
			[3, 135, 107, 5, 136, 108],
			[3, 67, 41, 13, 68, 42],
			[15, 54, 24, 5, 55, 25],
			[15, 43, 15, 10, 44, 16],
			// 21
			[4, 144, 116, 4, 145, 117],
			[17, 68, 42],
			[17, 50, 22, 6, 51, 23],
			[19, 46, 16, 6, 47, 17],
			// 22
			[2, 139, 111, 7, 140, 112],
			[17, 74, 46],
			[7, 54, 24, 16, 55, 25],
			[34, 37, 13],
			// 23
			[4, 151, 121, 5, 152, 122],
			[4, 75, 47, 14, 76, 48],
			[11, 54, 24, 14, 55, 25],
			[16, 45, 15, 14, 46, 16],
			// 24
			[6, 147, 117, 4, 148, 118],
			[6, 73, 45, 14, 74, 46],
			[11, 54, 24, 16, 55, 25],
			[30, 46, 16, 2, 47, 17],
			// 25
			[8, 132, 106, 4, 133, 107],
			[8, 75, 47, 13, 76, 48],
			[7, 54, 24, 22, 55, 25],
			[22, 45, 15, 13, 46, 16],
			// 26
			[10, 142, 114, 2, 143, 115],
			[19, 74, 46, 4, 75, 47],
			[28, 50, 22, 6, 51, 23],
			[33, 46, 16, 4, 47, 17],
			// 27
			[8, 152, 122, 4, 153, 123],
			[22, 73, 45, 3, 74, 46],
			[8, 53, 23, 26, 54, 24],
			[12, 45, 15, 28, 46, 16],
			// 28
			[3, 147, 117, 10, 148, 118],
			[3, 73, 45, 23, 74, 46],
			[4, 54, 24, 31, 55, 25],
			[11, 45, 15, 31, 46, 16],
			// 29
			[7, 146, 116, 7, 147, 117],
			[21, 73, 45, 7, 74, 46],
			[1, 53, 23, 37, 54, 24],
			[19, 45, 15, 26, 46, 16],
			// 30
			[5, 145, 115, 10, 146, 116],
			[19, 75, 47, 10, 76, 48],
			[15, 54, 24, 25, 55, 25],
			[23, 45, 15, 25, 46, 16],
			// 31
			[13, 145, 115, 3, 146, 116],
			[2, 74, 46, 29, 75, 47],
			[42, 54, 24, 1, 55, 25],
			[23, 45, 15, 28, 46, 16],
			// 32
			[17, 145, 115],
			[10, 74, 46, 23, 75, 47],
			[10, 54, 24, 35, 55, 25],
			[19, 45, 15, 35, 46, 16],
			// 33
			[17, 145, 115, 1, 146, 116],
			[14, 74, 46, 21, 75, 47],
			[29, 54, 24, 19, 55, 25],
			[11, 45, 15, 46, 46, 16],
			// 34
			[13, 145, 115, 6, 146, 116],
			[14, 74, 46, 23, 75, 47],
			[44, 54, 24, 7, 55, 25],
			[59, 46, 16, 1, 47, 17],
			// 35
			[12, 151, 121, 7, 152, 122],
			[12, 75, 47, 26, 76, 48],
			[39, 54, 24, 14, 55, 25],
			[22, 45, 15, 41, 46, 16],
			// 36
			[6, 151, 121, 14, 152, 122],
			[6, 75, 47, 34, 76, 48],
			[46, 54, 24, 10, 55, 25],
			[2, 45, 15, 64, 46, 16],
			// 37
			[17, 152, 122, 4, 153, 123],
			[29, 74, 46, 14, 75, 47],
			[49, 54, 24, 10, 55, 25],
			[24, 45, 15, 46, 46, 16],
			// 38
			[4, 152, 122, 18, 153, 123],
			[13, 74, 46, 32, 75, 47],
			[48, 54, 24, 14, 55, 25],
			[42, 45, 15, 32, 46, 16],
			// 39
			[20, 147, 117, 4, 148, 118],
			[40, 75, 47, 7, 76, 48],
			[43, 54, 24, 22, 55, 25],
			[10, 45, 15, 67, 46, 16],
			// 40
			[19, 148, 118, 6, 149, 119],
			[18, 75, 47, 31, 76, 48],
			[34, 54, 24, 34, 55, 25],
			[20, 45, 15, 61, 46, 16]
		];
		var qrRSBlock = function(totalCount, dataCount) {
			var _this = {};
			_this.totalCount = totalCount;
			_this.dataCount = dataCount;
			return _this;
		};
		var _this = {};
		var getRsBlockTable = function(typeNumber, errorCorrectLevel) {
			switch(errorCorrectLevel) {
			case QRErrorCorrectLevel.L :
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
			case QRErrorCorrectLevel.M :
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
			case QRErrorCorrectLevel.Q :
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
			case QRErrorCorrectLevel.H :
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
			default :
				return undefined;
			}
		};
		_this.getRSBlocks = function(typeNumber, errorCorrectLevel) {
			var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);
			if (typeof rsBlock == 'undefined') {
				throw new Error('bad rs block @ typeNumber:' + typeNumber +
						'/errorCorrectLevel:' + errorCorrectLevel);
			}
			var length = rsBlock.length / 3;
			var list = new Array();
			for (var i = 0; i < length; i += 1) {
				var count = rsBlock[i * 3 + 0];
				var totalCount = rsBlock[i * 3 + 1];
				var dataCount = rsBlock[i * 3 + 2];
				for (var j = 0; j < count; j += 1) {
					list.push(qrRSBlock(totalCount, dataCount) );
				}
			}
			return list;
		};
		return _this;
	}();
	//---------------------------------------------------------------------
	// qrBitBuffer
	//---------------------------------------------------------------------
	var qrBitBuffer = function() {
		var _buffer = new Array();
		var _length = 0;
		var _this = {};
		_this.getBuffer = function() {
			return _buffer;
		};
		_this.get = function(index) {
			var bufIndex = Math.floor(index / 8);
			return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
		};
		_this.put = function(num, length) {
			for (var i = 0; i < length; i += 1) {
				_this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
			}
		};
		_this.getLengthInBits = function() {
			return _length;
		};
		_this.putBit = function(bit) {
			var bufIndex = Math.floor(_length / 8);
			if (_buffer.length <= bufIndex) {
				_buffer.push(0);
			}
			if (bit) {
				_buffer[bufIndex] |= (0x80 >>> (_length % 8) );
			}
			_length += 1;
		};
		return _this;
	};
	//---------------------------------------------------------------------
	// qr8BitByte
	//---------------------------------------------------------------------
	var qr8BitByte = function(data) {
		var _mode = QRMode.MODE_8BIT_BYTE;
		var _data = data;
		var _bytes = qrcode.stringToBytes(data);
		var _this = {};
		_this.getMode = function() {
			return _mode;
		};
		_this.getLength = function(buffer) {
			return _bytes.length;
		};
		_this.write = function(buffer) {
			for (var i = 0; i < _bytes.length; i += 1) {
				buffer.put(_bytes[i], 8);
			}
		};
		return _this;
	};
	//=====================================================================
	// GIF Support etc.
	//
	//---------------------------------------------------------------------
	// byteArrayOutputStream
	//---------------------------------------------------------------------
	var byteArrayOutputStream = function() {
		var _bytes = new Array();
		var _this = {};
		_this.writeByte = function(b) {
			_bytes.push(b & 0xff);
		};
		_this.writeShort = function(i) {
			_this.writeByte(i);
			_this.writeByte(i >>> 8);
		};
		_this.writeBytes = function(b, off, len) {
			off = off || 0;
			len = len || b.length;
			for (var i = 0; i < len; i += 1) {
				_this.writeByte(b[i + off]);
			}
		};
		_this.writeString = function(s) {
			for (var i = 0; i < s.length; i += 1) {
				_this.writeByte(s.charCodeAt(i) );
			}
		};
		_this.toByteArray = function() {
			return _bytes;
		};
		_this.toString = function() {
			var s = '';
			s += '[';
			for (var i = 0; i < _bytes.length; i += 1) {
				if (i > 0) {
					s += ',';
				}
				s += _bytes[i];
			}
			s += ']';
			return s;
		};
		return _this;
	};
	//---------------------------------------------------------------------
	// gifImage (B/W)
	//---------------------------------------------------------------------
	var gifImage = function(width, height) {
		var _width = width;
		var _height = height;
		var _data = new Array(width * height);
		var _this = {};
		_this.setPixel = function(x, y, pixel) {
			_data[y * _width + x] = pixel;
		};
		_this.write = function(out) {
			//---------------------------------
			// GIF Signature
			out.writeString('GIF87a');
			//---------------------------------
			// Screen Descriptor
			out.writeShort(_width);
			out.writeShort(_height);
			out.writeByte(0x80); // 2bit
			out.writeByte(0);
			out.writeByte(0);
			//---------------------------------
			// Global Color Map
			// black
			out.writeByte(0x00);
			out.writeByte(0x00);
			out.writeByte(0x00);
			// white
			out.writeByte(0xff);
			out.writeByte(0xff);
			out.writeByte(0xff);
			//---------------------------------
			// Image Descriptor
			out.writeString(',');
			out.writeShort(0);
			out.writeShort(0);
			out.writeShort(_width);
			out.writeShort(_height);
			out.writeByte(0);
			//---------------------------------
			// Local Color Map
			//---------------------------------
			// Raster Data
			var lzwMinCodeSize = 2;
			var raster = getLZWRaster(lzwMinCodeSize);
			out.writeByte(lzwMinCodeSize);
			var offset = 0;
			while (raster.length - offset > 255) {
				out.writeByte(255);
				out.writeBytes(raster, offset, 255);
				offset += 255;
			}
			out.writeByte(raster.length - offset);
			out.writeBytes(raster, offset, raster.length - offset);
			out.writeByte(0x00);
			//---------------------------------
			// GIF Terminator
			out.writeString(';');
		};
		var bitOutputStream = function(out) {
			var _out = out;
			var _bitLength = 0;
			var _bitBuffer = 0;
			var _this = {};
			_this.write = function(data, length) {
				if ( (data >>> length) != 0) {
					throw new Error('length over');
				}
				while (_bitLength + length >= 8) {
					_out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
					length -= (8 - _bitLength);
					data >>>= (8 - _bitLength);
					_bitBuffer = 0;
					_bitLength = 0;
				}
				_bitBuffer = (data << _bitLength) | _bitBuffer;
				_bitLength = _bitLength + length;
			};
			_this.flush = function() {
				if (_bitLength > 0) {
					_out.writeByte(_bitBuffer);
				}
			};
			return _this;
		};
		var getLZWRaster = function(lzwMinCodeSize) {
			var clearCode = 1 << lzwMinCodeSize;
			var endCode = (1 << lzwMinCodeSize) + 1;
			var bitLength = lzwMinCodeSize + 1;
			// Setup LZWTable
			var table = lzwTable();
			for (var i = 0; i < clearCode; i += 1) {
				table.add(String.fromCharCode(i) );
			}
			table.add(String.fromCharCode(clearCode) );
			table.add(String.fromCharCode(endCode) );
			var byteOut = byteArrayOutputStream();
			var bitOut = bitOutputStream(byteOut);
			// clear code
			bitOut.write(clearCode, bitLength);
			var dataIndex = 0;
			var s = String.fromCharCode(_data[dataIndex]);
			dataIndex += 1;
			while (dataIndex < _data.length) {
				var c = String.fromCharCode(_data[dataIndex]);
				dataIndex += 1;
				if (table.contains(s + c) ) {
					s = s + c;
				} else {
					bitOut.write(table.indexOf(s), bitLength);
					if (table.size() < 0xfff) {
						if (table.size() == (1 << bitLength) ) {
							bitLength += 1;
						}
						table.add(s + c);
					}
					s = c;
				}
			}
			bitOut.write(table.indexOf(s), bitLength);
			// end code
			bitOut.write(endCode, bitLength);
			bitOut.flush();
			return byteOut.toByteArray();
		};
		var lzwTable = function() {
			var _map = {};
			var _size = 0;
			var _this = {};
			_this.add = function(key) {
				if (_this.contains(key) ) {
					throw new Error('dup key:' + key);
				}
				_map[key] = _size;
				_size += 1;
			};
			_this.size = function() {
				return _size;
			};
			_this.indexOf = function(key) {
				return _map[key];
			};
			_this.contains = function(key) {
				return typeof _map[key] != 'undefined';
			};
			return _this;
		};
		return _this;
	};
	//---------------------------------------------------------------------
	// returns qrcode function.
	return qrcode;
}();
module.exports = $qrcode;