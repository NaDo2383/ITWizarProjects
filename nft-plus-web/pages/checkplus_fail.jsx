import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function SuccessFail() {
    const {EncodeData} = useRouter().query;
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function _failReq() {
            try {
                const {data} = await axios.post(process.env.nextApiUrl + "/checkplus/fail", {
                    EncodeData,
                });
                setLoading(false);
                setResult(data);
            } catch (err) {
                setError(err.message)
            }
        }
        if (EncodeData) {
            _failReq();
        }
    }, [EncodeData]);
    
    return <div>failed!</div>;
}
