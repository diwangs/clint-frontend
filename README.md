Halo mas Hafizh, 

Berikut adalah contoh `create-react-app` yang sudah dimodifikasi sehingga bisa terhubung dengan BLOKCENGG. 
Modifikasi hanya dilakukan di `App.js`

Jika sampeyan ingin menggunakan selain react ya monggo, ini hanya contoh

Cara menggunakan:
1. Setup `clint-dapp` 
   1. (clone, `yarn install`, dkk.)
   2. `truffle develop`, let it run in the background, this is the development Ethereum node
   3. Buka terminal baru, `truffle build` trus `truffle migrate --network truffdev`, trus close
2. Install dan setup MetaMask di browser njenengan, ini pluggin buat nyambung ke Ethereum
3. Daftarkan private network di MetaMask dg memasukkan IP dan Port yg tertera saat `truffle develop` di dialog "Custom RPC"
4. Copy `clint-dapp/build/contracts/TrstToken.json` ke `src`, file ini adalah definisi dari interface smart contract yg akan digunakan. Kalau mau nyambung ke SC lain, ya ambil file yg sesuai
5. Jika sudah semua, `yarn start` donk (jangan lupa `yarn install`)