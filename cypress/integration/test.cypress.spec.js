describe('测试', () => {
	before(() => {
		cy.visit('/');
	});
	
	it('获取指定元素', () => {
		cy.get('.test').contains('我是')
	})
	
	it('测试点击事件', () => {
		cy.get('.btn').click();
	})
})