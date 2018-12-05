import { h, Component } from 'preact';
import 'preact-material-components/Theme/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import ImageSelect from './../../components/image-select';
import ImageCanvas from './../../components/image-canvas';
import { Button } from 'preact-material-components/Button';
import BackgroundType from '../../components/background-type';

export default class Home extends Component {
	fileChanged = (data) => {
		this.setState({
			fileData: data
		});
	}
	render() {
		return (
			<div class={`${style.home} ${style.container} page`}>
				<ImageSelect onChange={this.fileChanged} />
				<BackgroundType />
				<div><ImageCanvas fileData={this.state.fileData}/></div>
				<Button ripple primary raised> Download</Button>
			</div>
		);
	}
}
