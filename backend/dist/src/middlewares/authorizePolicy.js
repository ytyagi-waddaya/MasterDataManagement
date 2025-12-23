export const authorizePolicy = (resource, action) => {
    return async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
            // const result = await policyService.evaluate({ userId, resource, action });
            // if (!result.allowed) {
            //   return res.status(403).json({ success: false, message: "Forbidden" });
            // }
            next();
        }
        catch (error) {
            console.error("Policy evaluation error:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
};
//# sourceMappingURL=authorizePolicy.js.map