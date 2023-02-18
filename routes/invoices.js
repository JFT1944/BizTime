

// const { application } = require("express");
const express = require("express");
// const { route } = require("../app.js");
// const { Router } = require("../app");
const db = require("../db.js");
const router = new express.Router();



// Routes related to companies are held in this file.
router.use(express.json());


router.get('/invoices', async (req, res, next)=> {
    console.log("invoices")
    allInvloices = await db.query("SELECT * FROM invoices")
    return res.json({invoices: allInvloices.rows})
    // res.send("invoices page")
})

router.get('/invoices/:id', async (req, res, next)=> {
    invoivceId = req.params.id
    theInvoice = await db.query("SELECT * FROM invoices WHERE id=$1", [invoivceId])
    if (theInvoice.rows.length === 0) {
        next()
    }
    return res.json({invoice: theInvoice.rows[0]})
    
    
    // console.log("invoices")
    // res.send("invoices page")
})

router.post('/invoices', async (req, res, next)=> {
    console.log("invoices")
    newInvoice = req.query

    defNewInvoice = await db.query("INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date", [newInvoice.comp_code, newInvoice.amt])
    return res.json({invoice: defNewInvoice.rows[0]})
    // res.send("invoices page")
})

router.put('/invoices/:id', async (req, res, next)=> {
    console.log("invoices")
    invoiceId = req.params.id
    console.log(`invoiceID: ${invoiceId}`)
    getInvoice = await db.query("SELECT * FROM invoices WHERE id=$1", [invoiceId])
    if (getInvoice.rows.length === 0) {
        next()
    }
    let updateInvoice = req.query
    console.log(`updatedInvoice: ${updateInvoice}`)
    update = await db.query("UPDATE invoices SET comp_code=$1, amt=$2, paid=$3, paid_date=$4 WHERE id=$5 RETURNING id, comp_code, amt, paid, add_date, paid_date", [updateInvoice.comp_code, updateInvoice.amt, updateInvoice.paid, updateInvoice.paid_date, invoiceId])
    return res.json({invoice: update.rows[0]})
    // res.send("invoices page")
})

router.delete('/invoices/:id', async (req, res, next)=> {
    console.log("invoices")
    invoiceId = req.params.id
    getInvoice = await db.query("SELECT * FROM invoices WHERE id=$1", [invoiceId])
    if (getInvoice.rows.length === 0) {
        next()
    }
    deleteInvoice = await db.query("DELETE FROM invoices WHERE id=$1", [invoiceId])
    return res.json({status: "deleted"})
    // res.send("invoices page")
})




module.exports = router;