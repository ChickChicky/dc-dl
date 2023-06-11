const { input } = require('./input.js');

const U = undefined;

/**
 * @param {{a:number,b:number,o:string}[]} ops
 * @param {number[]} nums
 */
let applyOp = ( ops, nums ) => {
    let n = [...nums];
    for (let op of ops) {
        let a = n.splice(op.a,1)[0];
        let b = n.splice(op.b,1)[0];
        let v;
        if (op.o == '+') v = a + b;
        if (op.o == '-') v = a - b;
        if (op.o == '*') v = a * b;
        if (op.o == '/') v = a/b != Math.floor( a/b ) ? Infinity : a/b;
        if (v == Infinity) return [Infinity];
        if (typeof v == 'number') n.push(v);
    }
    return n;
}

/**
 * @param {{a:number,b:number,o:string}[]} ops
 * @param {number[]} nums
 */
let applyOpStr = (ops,nums) => {
    let n = [...nums];
    let s = '';
    for (let op of ops) {
        let a = n.splice(op.a,1)[0];
        let b = n.splice(op.b,1)[0];
        let v;
        /*if (op.o == '+') {
            v = a + b;
        }
        if (op.o == '-') {
            v = a - b;
        }
        if (op.o == '*') {
            v = a * b;
        }
        if (op.o == '/') {
            v = Math.floor( a / b );
        }*/
        if (op.o == '+') v = a + b;
        if (op.o == '-') v = a - b;
        if (op.o == '*') v = a * b;
        if (op.o == '/') v = a/b != Math.floor( a/b ) ? Infinity : a/b;
        s += `${a} ${op.o} ${b} = ${v}\n`;
        if (typeof v == 'number') n.push(v);
    }
    s += n.join(' ');
    return s;
}

;(async()=>{

    while (true) {

        let st = await input('NOUMBERZ: ',U,U,s=>s.split(/(\s+)/g).map(v=>v.match(/^\d+$/g)?`\x1b[33m${v}\x1b[39m`:`\x1b[31m${v}\x1b[39m`).join(''));
        if (st == input.Cancel) return;

        let st2 = await input('TARGUET: ',U,U,s=>Number.isNaN(+s)?`\x1b[31m${s}\x1b[39m`:`\x1b[33m${s}\x1b[39m`);
        if (st2 == input.Cancel) return;

        let tgt = +st2;
        let num = st.split(/\s+/g).map(v=>+v);

        const MAX_ITER = 10000;

        if ( !Number.isNaN(tgt) && num.every(n=>!Number.isNaN(n)) ) {
            
            let bestops = [];
            let bestScore = Infinity;

            for (let l = 0; l < MAX_ITER && bestScore != 0; l++) {

                let res = [];

                for (let i = 0; i < 2000; i++) {
                    let ops = [ ];
                    for (let ii = 0; ii < Math.min(Math.log(l+1),7); ii++) {
                        ops.push({ a:Math.floor(Math.random()*(num.length-ops.length)),b:Math.floor(Math.random()*(num.length-ops.length-1)), o:'+-*/'[Math.floor(Math.random()*4)] });
                    }
                    let rez = applyOp(ops,num);
                    res.push([ops,rez]);
                }

                let bd = Infinity
                let bo;
                for (let r of res) {
                    let diff = r[1].map(v=>Math.abs(v-tgt)).filter(d=>d!=undefined&&!Number.isNaN(d));
                    let bestDiff = Math.min(...diff);
                    if (bd > bestDiff && diff.length /*&& r[1][r[1].indexOf(bestDiff)] <= tgt*/) {
                        bo = r[0];
                        bd = bestDiff;
                    }
                }
                if (bestScore > bd) {
                    bestops = bo;
                    bestScore = bd;
                    let r = `\n${num.join(' ')}\n${applyOpStr(bestops,num).split(/\n/g).map((v,i,a)=>i==a.length-1?v.split(/(\s+)/g).map(v=>Math.abs(+v-tgt)==bestScore?`\x1b[36m${v}\x1b[39m`:v).join(''):v).join('\n')}`;
                    process.stdout.write(`\x1b[J${r}`);
                    process.stdout.write(`\x1b[A`.repeat(r.match(/\n/g).length)+`\x1b[G`);
                }

            }

            {
                console.log(`\x1b[J\n${num.join(' ')}\n${applyOpStr(bestops,num).split(/\n/g).map((v,i,a)=>i==a.length-1?v.split(/(\s+)/g).map(v=>Math.abs(+v-tgt)==bestScore?`\x1b[36m${v}\x1b[39m`:v).join(''):v).join('\n')}\n`);
            }

        }

    }

})();