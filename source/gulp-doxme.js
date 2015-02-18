import doxme from "doxme";
import util from "gulp-util";
import {obj as through} from "through2";

var DoxmeError = util.PluginError.bind(null, "gulp-doxme");


export default (settings) => {
  return through(function gulpDoxme (file, encoding, done) {
    var data = file.data;
    if (!data) {
      try {data = JSON.parse(file.contents.toString());}
      catch (error) {return done(new DoxmeError(
        "Input must be a valid JSON file."
        ));}
      }

    var markdown;
    try {markdown = doxme(data);}
    catch (error) {return done(new DoxmeError
      ( "Something went wrong with the doxme call. Here's what doxme says:\n"
      + error.message
      ));}

    var output = file.clone();
    output.path = util.replaceExtension(file.path, ".md");
    output.contents = new Buffer(markdown);
    done(null, output);
    });
  };
