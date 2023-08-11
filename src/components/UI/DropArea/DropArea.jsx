import classes from './DropArea.module.scss'
import PropTypes from "prop-types";

export const DropArea = ({sendImage}) => {
    const onDragOverHandler = (e) => {
        if (e.dataTransfer.items[0].type.includes('image') && e.dataTransfer.items.length == 1) {
            e.preventDefault()
            e.stopPropagation()
            e.target.style.cssText = 'background-color: #97BEF4; color: #F6F8FB;'
            e.dataTransfer.dropEffect = 'copy'
        }
    }
 
    const onDragLeaveHandler = (e) => {
        e.target.style.cssText = 'background-color: #F6F8FB; color: #BDBDBD;'
    }

    const onDropHandler = (e) => {
        e.target.style.cssText = 'background-color: #F6F8FB; color: #BDBDBD;'
        sendImage(e.dataTransfer.items[0].getAsFile())
    }

    return (
        <div 
        className={classes.DropArea} 
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
        onDrop={onDropHandler}
        > 
            <div className={classes.DropArea__text} style={{'marginTop':'10.08rem'}}>
                Drag & Drop your image here
            </div>
        </div>
    )
}


DropArea.propTypes = {
    sendImage: PropTypes.func
};
