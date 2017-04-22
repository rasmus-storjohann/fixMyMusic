import * as shelljs from "shelljs";
import * as fileExists from "file-exists";

export class TrackTestHelper
{
        public constructor(basePath: string)
        {
                this.path = basePath;
        }

        public at(name: string) : TrackTestHelper
        {
                return new TrackTestHelper(this.path + "/" + name);
        }

        private readonly path: string;

        public create(fileName: string) : void
        {
                this.createDir();
                this.createFile(fileName);
        }

        private createDir()
        {
                shelljs.mkdir("-p", this.path);
        }

        private createFile(fileName: string)
        {
                var path = this.filepath(fileName);
                shelljs.cp("test.mp3", path);
        }

        private filepath(fileName: string) : string
        {
                return this.path + "/" + fileName;
        }

        public exists(fileName: string) : boolean
        {
                var path = this.filepath(fileName);
                return fileExists(path);
        }
}
