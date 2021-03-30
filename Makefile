NEXTGENSHOP_FRONTEND_IMAGE?=nextgenshoping/frontend
NEXTGENSHOP_FRONTEND_PORT?=80

prep:
	docker build --tag=${NEXTGENSHOP_FRONTEND_IMAGE} .

start: prep
	docker run --rm \
		-p ${NEXTGENSHOP_FRONTEND_PORT}:3000 \
		-v $(shell pwd)/public:/root/public/ \
		-v $(shell pwd)/src:/root/src/ \
		${NEXTGENSHOP_FRONTEND_IMAGE} \
		npm start

build: prep
	docker run --rm \
		-v $(shell pwd)/public:/root/public/ \
		-v $(shell pwd)/src:/root/src/ \
		-v $(shell pwd)/build:/root/build/ \
		${NEXTGENSHOP_FRONTEND_IMAGE} \
		npm run build

FORCE: ;
