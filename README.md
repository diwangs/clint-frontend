Halo mas Hafizh, 

Berikut adalah contoh `create-react-app` yang sudah dimodifikasi sehingga bisa terhubung dengan BLOKCENGG. 
Modifikasi hanya dilakukan di `App.js`

Jika sampeyan ingin menggunakan selain react ya monggo, ini hanya contoh

Cara menggunakan:
1. Clone dan setup `clint-dapp` (clone, `yarn install`, dkk.)
2. `truffle develop`
3. `truffle build`
4. `truffle migrate`
5. Install dan setup MetaMask di browser njenengan, ini pluggin buat nyambung ke Ethereum
6. Daftarkan private network di MetaMask dg memasukkan IP dan Port yg tertera saat `truffle develop` dialog "Custom RPC"
7. Copy `clint-dapp/build/contract/TrstToken.json` ke `src`, file ini adalah definisi dari interface smart contract yg akan digunakan. Kalau mau nyambung ke SC lain, ya ambil file yg sesuai
8. Jika sudah semua, `yarn start` dong (jangan lupa `yarn install`)