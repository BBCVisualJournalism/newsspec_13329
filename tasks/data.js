module.exports = function (grunt) {
    grunt.registerTask('data', function () {

        var fs = require('fs');

        var dataPath = 'source/data/2016.01.27_GD_Dating_Game_Master - Data.tsv';
        var outputPath = 'source/tmpl/data_table.tmpl';

        var columns = {
            region: 0,
            country: 1,
            app: 2,
            rank: 3
        };

        var dataPassed = false;

        function makeTemplateVariable(string) {
            return string.replace(/\s+/g, '_').toLowerCase();
        }

        function generateTableEntry(rowCells) {
            var markup = '';

            markup += '                <tr>\n';
            markup += '                    <td class="datatable_country">{{= ' + makeTemplateVariable(rowCells[columns.country]) + ' }}</td>\n';
            markup += '                    <td class="datatable_app">{{= ' + makeTemplateVariable(rowCells[columns.app]) + ' }}</td>\n';
            markup += '                </tr>\n';

            return markup;
        }

        function readData(dataPath) {
            var data = fs.readFileSync(dataPath, 'utf8');
            var buffer = new Buffer(data);
            var dataString = buffer.toString();
            var dataRows = dataString.split('\n').filter(Boolean);

            var markup = '';

            markup += '<section class="section section-datatable">\n';
            markup += '    <div class="container">\n';
            markup += '        <table class="datatable datatable-left">\n';
            markup += '            <thead>\n';
            markup += '                <tr>\n';
            markup += '                    <th>{{= table_heading_country }}</th>\n';
            markup += '                    <th>{{= table_heading_top_dating_app }}</th>\n';
            markup += '                </tr>\n';
            markup += '            </thead>\n';
            markup += '            <tbody>\n';

            for (var row = 0; row < dataRows.length / 2; row++) {
                var rowCells = dataRows[row].split('\t');

                markup += generateTableEntry(rowCells);
            }

            markup += '            </tbody>\n';
            markup += '        </table>\n';
            markup += '\n';
            markup += '        <table class="datatable datatable-right">\n';
            markup += '            <thead>\n';
            markup += '                <tr>\n';
            markup += '                    <th>{{= table_heading_country }}</th>\n';
            markup += '                    <th>{{= table_heading_top_dating_app }}</th>\n';
            markup += '                </tr>\n';
            markup += '            </thead>\n';
            markup += '            <tbody>\n';

            for (var row = dataRows.length / 2; row < dataRows.length; row++) {
                var rowCells = dataRows[row].split('\t');

                markup += generateTableEntry(rowCells);

                if (row === dataRows.length - 1) {
                    dataPassed = true;
                }
            }

            markup += '            </tbody>\n';
            markup += '        </table>\n';
            markup += '\n';
            markup += '        <div class="clearfix"></div>\n';
            markup += '    </div>\n';
            markup += '</section>\n';

            return markup;
        }

        function writeData(markup, outputPath) {
            fs.writeFileSync(outputPath, markup);
            console.log('written to ' + outputPath);
        }

        var markup = readData(dataPath);
        if (dataPassed) {
            writeData(markup, outputPath);
        } else {
            console.log('error occurred when reading data');
        }
    });
};