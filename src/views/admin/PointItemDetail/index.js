import { connect } from 'react-redux'
import PointItemDetail from './PointItemDetail.jsx'
import { getPointItem, updatePointItem } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'item': state.points,
}), { getPointItem, updatePointItem, push })(PointItemDetail)