
.PHONY: start up down build restart logs clean sync seed

sync:
	cd backend && uv sync

start:
	cd backend && uv sync
	@if [ -d backend/instapet.db ]; then rm -rf backend/instapet.db; fi
	@touch backend/instapet.db
	docker compose down --remove-orphans
	docker compose build --no-cache
	docker compose up -d
	docker compose exec -T backend uv run python -m app.database.seed
	@echo ""
	@echo "✅  Frontend → http://localhost"
	@echo "✅  Backend  → http://localhost:8000"
	@echo ""

seed:
	docker compose exec -T backend uv run python -m app.database.seed
 
up:
	docker compose up -d
 
down:
	docker compose down
 
build:
	docker compose up -d --build
 
restart:
	docker compose down && docker compose up -d --build
 
logs:
	docker compose logs -f
 
clean:
	docker compose down --volumes --rmi all
 