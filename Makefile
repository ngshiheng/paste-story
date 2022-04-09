install:
	npm ci --prefix server/ && npm ci --prefix kgs/
lint:
	npm run prettier --prefix server/ && npm run prettier --prefix kgs/ && npm run eslint --prefix server/ && npm run eslint --prefix kgs/
