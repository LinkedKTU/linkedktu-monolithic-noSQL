const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            lecturerName: 'Mustafa Ulutaş',
        },
    );
});

module.exports = router;
