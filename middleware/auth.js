import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {

    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        const isCustomAuth = token.length < 500; // if >500 => google

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;