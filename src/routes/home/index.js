import { h, Component } from 'preact';
import 'preact-material-components/Theme/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import ImageSelect from './../../components/image-select';
import ImageCanvas from './../../components/image-canvas';
import BackgroundType from '../../components/background-type';

export default class Home extends Component {
	state = {
		bgConfig: {
			type: 'BLUR',
			color: '#fff',
			radius: 50
		}
	};
	fileChanged = data => {
		this.setState({
			fileData: data
		});
	};
	backgroundConfigChanged = config => {
		this.setState({
			bgConfig: config
		});
	};
	render() {
		return (
			<div class={`${style.home} ${style.container} page`}>
				<div class={`${style.imageSelect}`}>
					<ImageSelect onChange={this.fileChanged} />
				</div>
				{this.state.fileData && (
					<div>
						<BackgroundType onChange={this.backgroundConfigChanged} />
						<div>
							<ImageCanvas
								bgConfig={this.state.bgConfig}
								fileData={this.state.fileData}
							/>
						</div>
					
					</div>
				)}
			</div>
		);
	}
}
