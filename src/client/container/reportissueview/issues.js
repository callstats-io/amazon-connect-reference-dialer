// list of constant issues
// which might come from some API call later on

const issueList = [
	{
		name: '', items: [
			{text: 'I need help, contact me', marked: true},
		]
	},
	{
		name: 'Audio related problems', items: [
			{text: 'Unable to hear customer', marked: true},
			{text: 'Customer can’t hear agent', marked: false},
			{text: 'Customer is too quit', marked: true},
			{text: 'Audio dropped mid call', marked: false},
		]
	},
	{
		name: 'Call handling problems',
		items: [
			{text: 'Unable to transfer the customer', marked: false},
			{text: 'Unable to put the customer on hold', marked: false},
			{text: 'Call dropped while talking', marked: true},
			{text: 'Call dropped while hold', marked: false},
		],
	},
	{
		name: 'Static/ Gaps',
		items: [
			{text: 'Static on line', marked: false},
			{text: 'Intolerable static on line, not able to complete call', marked: false},
			{text: 'Gaps in audio', marked: false},
		],
	}
];

export default issueList;
