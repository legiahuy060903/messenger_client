
export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData()

        if (item.camera) {
            formData.append("file", item.camera)
        } else {
            formData.append("file", item)
        }

        formData.append("upload_preset", "nkim6kje")
        formData.append("cloud_name", "dbru1hnfl")

        const res = await fetch("https://api.cloudinary.com/v1_1/dbru1hnfl/auto/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imgArr;
}