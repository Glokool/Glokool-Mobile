// my ui model

const SET_RECEIPT_VISIBLE_TRUE = 'model/chat/set_receipt_visible/true' as const;
const SET_RECEIPT_VISIBLE_FALSE = 'model/chat/set_receipt_visible/false' as const;

export const setReceiptVisibleTrue = () => ({
    type: SET_RECEIPT_VISIBLE_TRUE
})

export const setReceiptVisibleFalse = () => ({
    type: SET_RECEIPT_VISIBLE_FALSE
})

type MyUIAction =
    | ReturnType<typeof setReceiptVisibleTrue>
    | ReturnType<typeof setReceiptVisibleFalse>

type MyUIState = {
    receiptVisible: boolean,
}

const InitialMyUIState: MyUIState = {
    receiptVisible: false
}

function MyUIModel(
    state: MyUIState = InitialMyUIState,
    action: MyUIAction
): MyUIState {

    switch (action.type) {
        case SET_RECEIPT_VISIBLE_TRUE: return { receiptVisible: true }
        case SET_RECEIPT_VISIBLE_FALSE: return { receiptVisible: false }
        default: return state
    }
}

export default MyUIModel;