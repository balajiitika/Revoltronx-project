
import mongoose from 'mongoose';
import grid from 'girdfs-stream';


const url = 'https://localhost:8000'

let gfs,gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () =>{
    gridfsBucket = new mongoose.GridFSBucket(conn.db,{
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
    
})

export const uploadImage = (request, response) =>{
    if (!request.file) {
        return response.status(404).json({msg:"file not found"})
    }
    const imageUrl = `${url}/file/${request.file.filename}`;
    return response.status(200).json(imageUrl);
}
export const getImage = async(request, response) => {
    try {
     const file = await gfs.files.findOne({ filename: request.params.filename});
      const readstream =  gridfsBucket.openDownloadStream(file,id);
        readstream.pipe(response);

    } catch (error) {
        return response.status(500).json({msg: error.message})
    }  
}