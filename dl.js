const { input } = require('./input.js');

const dico = require('./fr_full.json');

// const diko = Object.keys(Object.fromEntries([...dico,...anagrams.flat()].map(v=>[v])));

let cvt = ( n, b=base ) => {
    let out = '';
    while (n) {
        out += b[n%b.length];
        n = Math.floor(n / b.length);
    }
    return out || b[0];
}

let fac = ( n ) => {
    let v = 1;
    for ( let i = 1; i <= n; i++ ) v *= i;
    return v;
}

let cnt = ( s ) => {
    return Array.from(s).reduce((acc,c)=>(acc[c]=(acc[c]??0)+1,acc),{});
}

const U = undefined;

;(async()=>{
    while (true) {

        const w = await input('🔤: ',U,U,s=>`\x1b[32m${s}\x1b[39m`);

        if (w == input.Cancel) return;

        const ww = cnt(w.toLowerCase());
        
        for (let a of dico.filter( a => {let aa=cnt(a.toLowerCase());return Object.keys(aa).every(k=>ww[k]>=aa[k])} ).sort( (b,a) => a.length - b.length )) {
            process.stdout.write(`${a}\t\t`);
        }
        console.log();

    }   
})().then(process.exit);