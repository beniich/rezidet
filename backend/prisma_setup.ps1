npx prisma generate
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx prisma db push --accept-data-loss
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
