// import $ from "https://code.jquery.com/jquery-3.7.1.min.js"

// Membuat objek Deferred
let deferred = $.Deferred();

// Fungsi asinkron yang menggunakan Deferred
function asyncOperation() {
    setTimeout(function() {
        // Simulasikan operasi asinkron dengan setTimeout
        let success = true;  // Anda bisa mengubah ini ke false untuk melihat fail

        if (success) {
            deferred.resolve("Operasi berhasil!");  // Resolving deferred
        } else {
            deferred.reject("Operasi gagal!");  // Rejecting deferred
        }
    }, 2000);  // Misalkan operasi selesai dalam 2 detik

    return deferred.promise();  // Mengembalikan promise
}

// Menggunakan fungsi asinkron
asyncOperation().done(function(message) {
    console.log(message);  // Akan dipanggil jika operasi berhasil
}).fail(function(message) {
    console.error(message);  // Akan dipanggil jika operasi gagal
});
