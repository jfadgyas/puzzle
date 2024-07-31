import { puzzledb } from "../models/puzzle"

const filter = async (filter) => {
    
    return puzzledb.filter(item => item.model.includes('filter'))
}

export default filter