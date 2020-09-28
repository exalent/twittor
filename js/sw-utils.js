
//guarda el cache dinamico
function actualizaCacheDinamico(cacheDinamico, req, res) {

    if (res.ok) {
        return caches.open( cacheDinamico )
        .then( cache =>{
                cache.put(req, res.clone());
                return res.clone();
        });
    } else {
        return res;
    }
    


}