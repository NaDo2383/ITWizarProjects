"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TamtamContractAdaptor = exports.TamtamContractLowStub = void 0;
var bn_js_1 = require("bn.js");
var contract_json_1 = require("./contract.json");
function reduceArrToNFTState(arr) {
    var keys = ["workId", "royalty", "royaltyReceiver", "isTrading", "price", "resale"];
    var state = keys.reduce(function (acc, key) {
        acc[key] = arr[key];
        return acc;
    }, {});
    state.price = new bn_js_1["default"](state.price);
    return state;
}
var TamtamContractLowStub = /** @class */ (function () {
    function TamtamContractLowStub(web3, address) {
        this.contract = new web3.eth.Contract(contract_json_1["default"].abi, address);
    }
    TamtamContractLowStub.prototype.mintFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.mintFee().call().then(function (str) { return new bn_js_1["default"](str); })];
            });
        });
    };
    TamtamContractLowStub.prototype.nftState = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.nftState(tokenId.toString())
                        .call().then(function (arr) { return reduceArrToNFTState(arr); })];
            });
        });
    };
    TamtamContractLowStub.prototype.setNFTState = function (tokenOwner, tokenId, nftState) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.setNFTState(tokenId.toString(), __assign(__assign({}, nftState), { price: nftState.price.toString() }))
                        .send({ from: tokenOwner })];
            });
        });
    };
    TamtamContractLowStub.prototype.setMintFee = function (contractOwner, newMintFee) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.setMintFee(newMintFee.toString())
                        .send({ from: contractOwner })];
            });
        });
    };
    TamtamContractLowStub.prototype.mint = function (tokenOwner, workId, royalty, royaltyReceiver, uri, fee) {
        return this.contract.methods.mint(tokenOwner, workId, royalty, royaltyReceiver, uri)
            .send({ from: tokenOwner, value: fee.toString() });
    };
    TamtamContractLowStub.prototype.buyNFT = function (buyer, tokenId, price) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.buyNFT(tokenId)
                            .send({ from: buyer, value: price.toString() })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TamtamContractLowStub.prototype.ownerOf = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.ownerOf(tokenId.toString())
                            .call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return TamtamContractLowStub;
}());
exports.TamtamContractLowStub = TamtamContractLowStub;
var TamtamContractAdaptor = /** @class */ (function () {
    function TamtamContractAdaptor(contract) {
        this.contract = contract;
    }
    /**
     * NFT 발행
     * @param tokenOwner 토큰을 지급할 이더리움 지갑 주소
     * @param workId 작업물 ID
     * @param royalty 창작자 로얄티 (0~10)
     * @param royaltyReceiver 창작자 로얄티 지급 이더리움 지갑 주소
     * @param uri NFT 메타데이터 URI
     * @param fee 지급할 토큰 발행 수수료
     * @returns 발행된 토큰의 ID로 resolve하는 promise
     */
    TamtamContractAdaptor.prototype.mintToken = function (tokenOwner, workId, royalty, royaltyReceiver, uri, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                promise = this.contract.mint(tokenOwner, workId, royalty, royaltyReceiver, uri, fee);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        promise.on('receipt', function (receipt) {
                            if (receipt.events) {
                                resolve(receipt.events.Transfer.returnValues.tokenId);
                            }
                            else {
                                reject(new Error('this path assumed impossible'));
                            }
                        });
                        promise.on('error', function (error) { return reject(error); });
                    })];
            });
        });
    };
    /**
     * NFT를 판매 상태로 변경
     * @param tokenOwner 토큰을 소유한 지갑 주소; Metamask로 unlock해야 함
     * @param tokenId 판매 상태로 변경할 NFT
     * @param price 판매 가격
     */
    TamtamContractAdaptor.prototype.markForSale = function (tokenOwner, tokenId, price) {
        return __awaiter(this, void 0, void 0, function () {
            var state0, state1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.nftState(tokenId)];
                    case 1:
                        state0 = _a.sent();
                        state1 = __assign(__assign({}, state0), { isTrading: true, price: price });
                        return [4 /*yield*/, this.contract.setNFTState(tokenOwner, tokenId, state1)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 판매 중인 NFT의 가격을 변경
     * @param tokenOwner 토큰을 소유한 지갑 주소; Metamask로 unlock해야 함
     * @param tokenId 가격을 변경할 NFT
     * @param price 변경할 가격
     */
    TamtamContractAdaptor.prototype.changeSalePrice = function (tokenOwner, tokenId, price) {
        return __awaiter(this, void 0, void 0, function () {
            var state0, state1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.nftState(tokenId)];
                    case 1:
                        state0 = _a.sent();
                        state1 = __assign(__assign({}, state0), { price: price });
                        return [4 /*yield*/, this.contract.setNFTState(tokenOwner, tokenId, state1)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * NFT 구입
     * @param buyer tokenOwner 토큰을 소유한 지갑 주소; Metamask로 unlock해야 함
     * @param tokenId 구입할 NFT의 ID
     * @param price 지급할 가격
     */
    TamtamContractAdaptor.prototype.buyNFT = function (buyer, tokenId, price) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.buyNFT(buyer, tokenId, price)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 현재 NFT 발급 수수료를 조회
     * @returns 현재 발급 수수료로 resolve하는 promise
     */
    TamtamContractAdaptor.prototype.mintFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.mintFee()];
            });
        });
    };
    /**
     * 현재 토큰의 판매 상태를 조회
     * @returns 판매 상태로 resolve하는 promise
     */
    TamtamContractAdaptor.prototype.getTokenSaleStatus = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.nftState(tokenId)];
                    case 1: return [2 /*return*/, (_a.sent()).isTrading];
                }
            });
        });
    };
    /**
     * 토큰의 가격 조회
     * @param tokenID 조회할 NFT의 ID
     * @returns 판매 가격으로 resolve하는 promise
     */
    TamtamContractAdaptor.prototype.getTokenPrice = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.nftState(tokenId)];
                    case 1: return [2 /*return*/, (_a.sent()).price];
                }
            });
        });
    };
    /**
     * 토큰의 보유자 조회
     * @param tokenID 조회할 NFT의 ID
     * @returns 토큰을 보유 중인 이더리움 지갑 주소로 resolve하는 promise
     */
    TamtamContractAdaptor.prototype.getTokenOwner = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.ownerOf(tokenId)];
            });
        });
    };
    return TamtamContractAdaptor;
}());
exports.TamtamContractAdaptor = TamtamContractAdaptor;
