export const validate = (schema) => {
    return (req, res, next) => {
        console.log("BODY =", req.body)

        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            })
        }

        req.validatedData = result.data

        next()
    }
}