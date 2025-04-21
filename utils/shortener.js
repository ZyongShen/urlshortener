import dns from "dns";


export class Shortener {
    
    constructor() {
        this.allUrls = [];
        this.shortenUrl = this.shortenUrl.bind(this);
        this.getByShortUrl = this.getByShortUrl.bind(this);

    }

    shortenUrl(req, res) {
        let originalUrl = req.body["url"];
        var checkUrl = originalUrl.substring(0, originalUrl.length-1).replace("https://", "");
        
        dns.lookup(checkUrl, (err, address) => {
            if (err) {
                console.error(err);
                res.json({
                    "status": 400
                })
            }
            console.log(address);
        })


        let shortUrl = this.allUrls.length += 1;
        let result = {
            "original_url": originalUrl,
            "short_url": shortUrl
        }
        this.allUrls.push(result);

        res.json(result)
    }

    getByShortUrl(req, res) {
        var keyId = req.params.id;
        if (keyId < this.allUrls.length) {
            let entry = this.allUrls[keyId];
            res.redirect(entry.original_url);
        } else {
            res.json({
                "status": 500,
                "message": "invalid short url"
            });
        }
    }
}
