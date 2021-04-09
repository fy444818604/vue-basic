import MyButton from './Button.vue';

export default {
  title: 'Example/Button',
  component: MyButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
	decorators: [() => ({ template: '<div style="margin: 3em;"><story /></div>' })],
	parameters: {
		backgrounds: {
			values: [
				{ name: 'red', value: '#f00' },
				{ name: 'green', value: '#0f0' },
				{ name: 'blue', value: '#00f' },
			],
		},
	},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button @onClick="onClick" v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
	primary: true,
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

Primary.storyName = 'I am the primary';
