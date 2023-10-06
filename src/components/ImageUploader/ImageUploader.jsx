import classes from './ImageUploader.module.scss'
import { DropArea } from '../UI/DropArea/DropArea'
import { FileChooser } from '../UI/FileChooser/FileChooser'
import { Or } from '../UI/Or/Or'
import { postFile } from '../../services/axios';
import { useSendImageHandler } from '../../hooks/useSendImageHandler';
import { ImageLoading } from '../ImageLoading/ImageLoading';
import { useSelector } from 'react-redux';


export const ImageUploader = () => {
    const isLoadingImage = useSelector((state) => state.submit.isLoadingImage)

    
    const [sendImageHandler] = useSendImageHandler();
    const sendImage = async (image) => {
        sendImageHandler(async () => await postFile(image));
    };

    return (
        <>
        {
            isLoadingImage
            ?
            <ImageLoading title={'Uploading...'}/>
            :
            <div className={classes.Wrap}>
                <div className={classes.Header}>
                    <div className={classes.HeaderText}>
                        Upload your image
                    </div>
                    <div className={classes.HeaderSubText}>
                        File should be Jpeg, Png,...
                    </div>
                </div>

                <div>
                    <DropArea sendImage={sendImage}/>
                    <Or margin={'1.18rem 0 0 0'}/>
                    <FileChooser sendImage={sendImage}/>
                </div>
            </div>
        }
        </>
    )
}

