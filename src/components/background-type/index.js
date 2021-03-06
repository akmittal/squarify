import { h, Component } from 'preact';
import Select from 'preact-material-components/Select';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import 'preact-material-components/Button/style.css';
import Slider from 'preact-material-components/Slider';
import 'preact-material-components/Slider/style.css';
import { SketchPicker } from 'react-color';
import { Button } from 'preact-material-components/Button';
import style from './style';

import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';

class BackgroundType extends Component {
	static typeValues = ['BLUR', 'SOLID'];
	state = {
		chosenIndex: 1,
		type: 'BLUR',
		color: '#fff',
		radius: 50
	};
	showChangeRadius = () => {
		this.setState(
			prevState => ({ ...prevState, MODAL_TO_SHOW: 'RADIUS' }),
			() => {
				this.displayModal();
			}
		);
	};
	showChangeColor = () => {
		this.setState(
			prevState => ({ ...prevState, MODAL_TO_SHOW: 'COLOR' }),
			() => {
				this.displayModal();
			}
		);
	};
	displayModal = () => {
		this.scrollingDlg.MDComponent.show();
	};

	handleSliderChange = evt => {
		if (isNaN(evt.detail.value)) {
			return;
		}
		this.setState({ radius: evt.detail.value }, () => {
			this.emitChange();
		});
	};

	handleChangeComplete = cr => {
		this.setState({ color: cr.hex }, () => {
			this.emitChange();
		});
	};
	emitChange() {
		const { type, radius, color } = this.state;
		const bgConfig = {
			type: type.toUpperCase(),
			color,
			radius
		};
		this.props.onChange(bgConfig);
	}
	render() {
		const { type, radius, color } = this.state;

		return (
			<div>
				<div class={`${style.container}`}>
					<div class={`${style.selectWrapper}`}>
						<Select
							class={`${style.selectControl}`}
							outlined
							hintText="Select background type"
							value={type}
							selectedIndex={this.state.chosenIndex}
							onChange={e => {
								this.setState(
									{
										chosenIndex: e.target.selectedIndex,
										type: BackgroundType.typeValues[e.target.selectedIndex - 1]
									},
									() => {
										this.emitChange();
									}
								);
							}}
						>
							<Select.Item>BLUR</Select.Item>
							<Select.Item>SOLID</Select.Item>
						</Select>
						<div class={`${style.flexColumn}`}>
							{this.state.type === 'BLUR' && (
								<Button ripple primary raised onClick={this.showChangeRadius}>
									Change Radius
								</Button>
							)}
							{this.state.type === 'SOLID' && (
								<Button ripple primary raised onClick={this.showChangeColor}>
									Change Color
								</Button>
							)}
						</div>
					</div>
				</div>

				<div>
					<Dialog
						ref={scrollingDlg => {
							this.scrollingDlg = scrollingDlg;
						}}
					>
						<Dialog.Header>Change Value</Dialog.Header>
						{this.state.MODAL_TO_SHOW === 'RADIUS' && (
							<Dialog.Body>
								<div class={`${style.center}`}>
									<Slider
										min={0}
										step={1}
										value={this.state.radius}
										max={180}
										discrete
										onChange={this.handleSliderChange}
									/>
								</div>
							</Dialog.Body>
						)}
						{this.state.MODAL_TO_SHOW === 'COLOR' && (
							<Dialog.Body>
								<div class={`${style.center}`}>
									<SketchPicker
										color={this.state.color}
										onChangeComplete={this.handleChangeComplete}
									/>
								</div>
							</Dialog.Body>
						)}
					</Dialog>
				</div>
			</div>
		);
	}
}

export default BackgroundType;
