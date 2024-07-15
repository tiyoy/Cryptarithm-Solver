class Cryptarithmetic{
    constructor({operand, result, operandAndResult, idxChar, maxLen}){
        this.operand = operand;
        this.result = result;
        this.operandAndResult = operandAndResult;
        this.idxChar = idxChar;
        this.maxLen = maxLen;
        this.arr = [];
        this.sol = [];
        this.n = 0;
    }

    // Fungsi pembangkit untuk membangkitkan nilai xk
    tempat(i, k){
        for(let j=0; j<k; j++){
            if(this.arr[j] == i){
                return false;
            }
        }
        return true;
    }

    boundingFunction(k){
        var Xi = 0;

        for(let i=0; i<this.maxLen; i++){
            var hsl = 0;
            for(let strop of this.operand){
                idxtemp = strop.length - 1 - i;
                if(idxtemp >= 0){
                    if(this.idxChar[strop[idxtemp]] > k){
                        return true;
                    }
                    hsl += this.arr[this.idxChar[strop[idxtemp]]];
                }
            }
            var idxResult = this.idxChar[this.result[this.result.length - 1 - i]];
            var xResult = this.arr[idxResult];

            if(idxResult > k){
                return true;
            }
            if(i != maxLen-1){
                if((hsl+Xi) % 10 != xResult){
                    return false;
                }
            } else{
                if(hsl+Xi != xResult){
                    return false;
                }
            }
            Xi = Math.floor((hsl + Xi) / 10);
        }

        for(let strOpRes of this.operandAndResult){
            if(strOpRes.length > 1 && this.arr[this.idxChar[strOpRes[0]]] == 0){
                return false;
            }
        }

        return true;
    }

    backtracking(k){
        for(let i=0; i<10; i++){
            if(this.tempat(i, k)){
                this.arr[k] = i;
                if(this.boundingFunction(k)){
                    if(k == this.n){
                        this.sol.push(this.arr.slice());
                    } else{
                        this.backtracking(k+1);
                    }
                    this.arr[k] = -1;
                }
            }
        }
    }

    isSolveable(){
        var maxOp = this.operand[0].length;
        for(let op of this.operand){
            if(maxOp < op.length){
                maxOp = op.length;
            }
        }
        return this.result.length >= maxOp && this.result.length <= maxOp + 1;
    }

    getSolution(){
        var strRet = "";
        var solusike = 1;
        var arrchr = [];

        for(let key in this.idxChar){
            arrchr.push(key);
        }
        arrchr.sort();

        strRet += `<p>Terdapat <span class="text-success fw-bold text-center">${this.sol.length} Solusi</span> dari Persoalan Cryptarithmetic ini, yaitu:</p>`

        for(let solusi of this.sol){
            var strSol = ""
            for(let i=0; i<arrchr.length; i++){
                strSol += `${arrchr[i]}=${solusi[this.idxChar[arrchr[i]]]}${i != arrchr.length - 1 ? ', ' : ' '}`;
            }
            strRet += `<p>Solusi ke-${solusike}: ${strSol}</p>`;
            strRet += `<div class="card mb-5">`;
            for(let opr of this.operand){
                strRet += `<p class="mb-1">`;
                for(let chrOp of opr){
                    strRet += `${solusi[this.idxChar[chrOp]]}`;
                }
                strRet += `</p>`;
            }
            strRet += "-".repeat(15) + "+";
            strRet += `<p class="mb-1">`;
            for(let chrRes of this.result){
                    strRet += `${solusi[this.idxChar[chrRes]]}`;
            }
            strRet += `</p>`;
            strRet += `</div>`;
            solusike += 1;
        }

        return strRet;
    }

    solve(){
        this.n = Object.keys(this.idxChar).length - 1;
        if(this.n < 10){
            if(this.isSolveable()){
                this.arr = Array(this.n+1).fill(-1);
                this.backtracking(0);
                if(this.sol.length > 0){
                    return this.getSolution();
                } else{
                    return `<p class="text-danger text-center">Tidak ada solusi yang memenuhi.</p>`
                }
            } else {
                return `<p class="text-danger text-center">Persoalan tersebut tidak dapat diselesaikan.</p>`
            }
        } else{
            return `<p class="text-danger text-center">Persoalan tidak dapat diselesaikan karena jumlah huruf uniknya lebih dari 10.</p>`
        }
    }

}