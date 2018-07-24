import { connect } from 'react-redux'
import PointList from './PointList.jsx'
import { getPoints } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'points': state.members.points,
}), { getPoints, push })(PointList)