const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2')


const jobSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        file: {
            type: String,
            required: [true, "Please enter file name"],
        },
        customer: {
            type: String,
            required: [true, "Please enter customer name"],
        },
        ref: {
            type: String,
            required: [true, "Please enter reference name"],
        },
        cammer: {
            type: String,
            required: [true, "Please enter cammer name"],
        },
        board: {
            type: String,
            enum: [
                "Double Sided FR4",
                "Single Sided FR4",
                "Single Sided ALU",
                "Multilayer",
            ],
        },
        panel: {
            type: String,
            required: [true, "Please enter panel type"],
            enum: [
                "Proto",
                "Production",
                "Proto to Production",
                "Restep",
                "Import",
            ],
        },
        thickness: {
            type: String,
        },
        sales: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ["new", "hold", "closed"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

jobSchema.plugin(mongoosePagination)
module.exports = mongoose.model("Job", jobSchema);
