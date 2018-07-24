import { connect } from 'react-redux'
import MemberPoints from './MemberPoints.jsx'
import { getPoints } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'points': state.members.points,
}), { getPoints, push })(MemberPoints)