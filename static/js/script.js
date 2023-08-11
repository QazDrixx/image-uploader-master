window.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('.file-form'),
        drop_zone = document.querySelector('.dragdrop'),
        file_upload = document.querySelector('#file-upload'),
        err = document.querySelector('.dragdrop__err'),
        preview_image = document.querySelector('.preview-image'),
        image_url__link = document.querySelector('.image-url__link');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.body.addEventListener(eventName, (e) => {
            e.preventDefault();
            const item = e.dataTransfer.items[0];
            if (item.kind === "file" && item.type.includes('image') && e.target.classList.contains('dnd')) {
                e.dataTransfer.dropEffect = 'copy';
            } else e.dataTransfer.dropEffect = 'none';

        })
    });
    
    drop_zone.addEventListener('dragover', (e) => {
        const item = e.dataTransfer.items[0];
        if (item.kind === "file" && item.type.includes('image')) {
            drop_zone.classList.add('dragdrop-enter')
        }
    });

    drop_zone.addEventListener('dragleave', () => drop_zone.classList.remove('dragdrop-enter'));
    
    drop_zone.addEventListener('drop', async (e) => {
        drop_zone.classList.remove('dragdrop-enter');

        if (e.dataTransfer.items.length != 1) {
            err.classList.remove('hide')
        } else {
            err.classList.add('hide')
            const file = e.dataTransfer.items[0].getAsFile();
            await sendImage(file)
        }
    })

    file_upload.addEventListener('input', async () => {
        if (err.classList.contains('hide')) err.classList.add('hide')

        console.log(file_upload.files);
        const file = file_upload.files[0];
        await sendImage(file)
        file_upload.value = null
    })

    document.querySelector('.copylink').addEventListener('click', () => {
        navigator.clipboard.writeText(image_url__link.getAttribute('href'));
    });

    document.querySelector('.retry').addEventListener('click', () => {
        document.querySelector('.error-wrap').classList.toggle('hide')
        document.querySelector('.wrap').classList.toggle('hide')
    })


    async function sendImage(file) {
        document.querySelector('.wrap').classList.toggle('hide')
        document.querySelector('.loading-wrap').classList.toggle('hide')

        let formData = new FormData
        formData.append('file', file)

        const request = await postRequest('/image_upload', formData)
        
        if (request.ok) {
            let image_url = await request.text()
            console.log(image_url);  
            document.querySelector('.loading-wrap').classList.toggle('hide')
            document.querySelector('.success-wrap').classList.toggle('hide')
            preview_image.style = `background-image: url('${image_url}');`
            image_url__link.setAttribute('href', image_url)
            image_url__link.innerHTML = image_url
        }
        else {
            console.log(request);
            document.querySelector('.loading-wrap').classList.toggle('hide')
            document.querySelector('.error-wrap').classList.toggle('hide')
        }
    }

    async function postRequest(url, body) {
        return await fetch(url, {
            method: 'POST',
            // headers: { 'Content-type': 'multipart/form-data' },
            body: body,
        });
    }
});
