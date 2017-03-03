clang-format -style=file -i */*ts
tsc
npm test
(cd .. && ./bin/index.js --dry-run --out out music/[ABCDEFGHIJKLMNOPQRST]*)
