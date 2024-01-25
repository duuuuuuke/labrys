// api/myTokens
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const client = await MongoClient.connect(
            "mongodb+srv://dukebai8383:Jug5DxXe5St3Up6G@cluster0.bllkxkt.mongodb.net/myTokens?retryWrites=true&w=majority"
        );
        const db = client.db();

        const myTokensCollection = db.collection("myTokens");
        const myTokens = await myTokensCollection.find().toArray();
        client.close();
        res.status(200).json({
            data: myTokens.map((token) => ({
                rank: token.rank,
                img: token.img,
                symbol: token.symbol,
                marketCap: token.marketCap,
                price: token.price,
                percentChange: token.percentChange
            }))
        });
    }
    if (req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect(
            "mongodb+srv://dukebai8383:Jug5DxXe5St3Up6G@cluster0.bllkxkt.mongodb.net/myTokens?retryWrites=true&w=majority"
        );
        const db = client.db();

        const myTokensCollection = db.collection("myTokens");

        const existingToken = await myTokensCollection.findOne(data);
        if (existingToken) {
            res.status(201).json({ message: "Token already exists!" });
            client.close();
            return;
        }

        const result = await myTokensCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: "Token inserted!" });
    }

    if (req.method === "DELETE") {
        const data = req.body;

        const client = await MongoClient.connect(
            "mongodb+srv://dukebai8383:Jug5DxXe5St3Up6G@cluster0.bllkxkt.mongodb.net/myTokens?retryWrites=true&w=majority"
        );
        const db = client.db();

        const myTokensCollection = db.collection("myTokens");

        const result = await myTokensCollection.deleteOne(data);

        console.log(result);
        client.close();
        res.status(200).json({ message: "Token deleted!" });
    }
}
