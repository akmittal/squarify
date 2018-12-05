import { h, Component } from 'preact';
import Select from 'preact-material-components/Select';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import Slider from 'preact-material-components/Slider';
import 'preact-material-components/Slider/style.css';
import { SketchPicker } from 'react-color';
import style from './style';

class BackgroundType extends Component {
	render() {
		return (
			<div  class={`${style.container}`}>
				<Select
					outlined
					hintText="Select an option"
					selectedIndex={this.state.chosenIndex}
					onChange={e => {
						this.setState({
							chosenIndex: e.target.selectedIndex
						});
					}}
				>
					<Select.Item>Blur</Select.Item>
					<Select.Item>Solid</Select.Item>
				</Select>
				<Slider
					min={0}
					step={1}
					value={20}
					max={180}
					discrete
					onChange={this.handleSliderChange}
				/>

				<SketchPicker
					color={this.state.background}
					onChangeComplete={this.handleChangeComplete}
				/>
			</div>
		);
	}

	state = {
		background: '#fff'
	};
	handleSliderChange = evt => {
		console.log(evt);
	};

	handleChangeComplete = color => {
		this.setState({ background: color.hex });
	};
	emitChange() {
		this.props.onChange();
	}
}

export default BackgroundType;
