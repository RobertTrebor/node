var graves = [
{
            "g_id": 1,
            "firstname": "Anna",
            "lastname": "Seghers",
            "sex": "f",
            "datebirth": "1900-11-18T23:00:00.000Z",
            "datedeath": "1983-05-31T22:00:00.000Z",
            "c_id": 1,
            "grave_loc": null,
            "latitude": 52.52805,
            "longitude": 13.38416,
            "vita_path": "http://www.lengsfeld.de/cimitery/vitae/Anna_Seghers.html",
            "tombstone_path": "c_id1_g_id1_1386244170.jpg"
        },
        {
            "g_id": 2,
            "firstname": "Arnold",
            "lastname": "Zweig",
            "sex": "m",
            "datebirth": "1887-11-09T23:00:00.000Z",
            "datedeath": "1968-11-25T23:00:00.000Z",
            "c_id": 1,
            "grave_loc": "NULL",
            "latitude": 52.5275,
            "longitude": 13.38388,
            "vita_path": "",
            "tombstone_path": "c_id1_g_id2_1386244904.jpg"
        },
        {
            "g_id": 3,
            "firstname": "Marlene",
            "lastname": "Dietrich",
            "sex": "f",
            "datebirth": "1901-12-26T23:00:00.000Z",
            "datedeath": "1992-05-05T22:00:00.000Z",
            "c_id": 2,
            "grave_loc": null,
            "latitude": 52.47666,
            "longitude": 13.32194,
            "vita_path": null,
            "tombstone_path": ""
        }

];

exports.findAll = function (req, res, next) {
    res.send(graves);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(graves[id]);
};
