const issueList = {
	'Audio related problems': [
		{text: 'Unable to hear customer', marked: true},
		{text: 'Customer can’t hear agent', marked: false},
		{text: 'Customer is too quit', marked: true},
		{text: 'Audio dropped mid call', marked: false},
	],
	'Call handling problems': [
		{text: 'Unable to transfer the customer', marked: false},
		{text: 'Unable to put the customer on hold', marked: false},
		{text: 'Call dropped while talking', marked: true},
		{text: 'Call dropped while hold', marked: false},
	],
	'Static/ Gaps': [
		{text: 'Static on line', marked: false},
		{text: 'Intolerable static on line, not able to complete call', marked: false},
		{text: 'Gaps in audio', marked: false},
	],
};

export default issueList;
