import './DeleteVerification.css';

export default function DeleteVerification ({deleteFunction, OpenClose, CloseBox, Text}) {
    
    function deleteItem(){
        OpenClose();
        deleteFunction();
    }

    function restate(event){
        event.preventDefault();
        CloseBox(false);
    }
    
    return(
        <div className='deleteVerificationWindow'>
        <div className='deleteVerificationBox shadow-lg p-3 mb-5 bg-body rounded'>
            <div className="alert alert-danger" role="alert">
                   {Text}
            </div>
            <div className='deleteVerificationButtons'>
                <button className='deleteVerificationButton btn btn-outline-danger' onClick={deleteItem}>מחיקה</button>
                <button className='deleteVerificationButton btn btn-outline-primary' onClick={restate}>חזרה</button>
            </div>
        </div>
        </div>
    )
}