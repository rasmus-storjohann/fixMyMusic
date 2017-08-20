# How to run just some tests, generally how to pass arguments through npm to mocha
# npm test -- --grep TODO

clang-format -style=file -i */*ts
tsc
npm test
(cd .. && ./bin/index.js --dry-run --out out music/*)
