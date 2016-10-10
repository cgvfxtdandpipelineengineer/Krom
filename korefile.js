const os = require('os');

let project = new Project('Krom', __dirname);

const release = false;
const build = release ? 'release' : 'debug';
let system = 'linux';
const libdir = 'V8/Libraries/' + system + '/' + build + '/';

project.cpp11 = true;
project.addFile('Sources/**');
project.addIncludeDir('V8/include');

if (platform === Platform.Windows) {
	if (!release) {
		project.addLib('Dbghelp');
		project.addLib('Shlwapi');
	}
	project.addLib('Winmm');
	project.addLib('V8/Libraries/win32/debug/v8.dll');
	project.addLib('V8/Libraries/win32/debug/v8_libbase');
	project.addLib('V8/Libraries/win32/debug/v8_libplatform');
}

if (platform === Platform.OSX) {
	project.addLib('V8/Libraries/osx/debug/libicudata.a');
	project.addLib('V8/Libraries/osx/debug/libicui18n.a');
	project.addLib('V8/Libraries/osx/debug/libicuuc.a');
	project.addLib('V8/Libraries/osx/debug/libv8_base.a');
	project.addLib('V8/Libraries/osx/debug/libv8_external_snapshot.a');
	project.addLib('V8/Libraries/osx/debug/libv8_libbase.a');
	project.addLib('V8/Libraries/osx/debug/libv8_libplatform.a');
}

if (platform === Platform.Linux) {
	project.addLib('../' + libdir + 'libv8.so');
	project.addLib('../' + libdir + 'libv8_libplatform.a');
	project.addLib('../' + libdir + 'libv8_libbase.so');
	project.addLib('../' + libdir + 'libicui18n.so');
	project.addLib('../' + libdir + 'libicuuc.so');
}

project.setDebugDir('Deployment/' + build + '/' + system);

Project.createProject('Kore', __dirname).then((kore) => {
	project.addSubProject(kore);
	resolve(project);
});

